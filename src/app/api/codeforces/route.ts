import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface CFRatingEntry {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

interface CFProblem {
  contestId?: number;
  index: string;
  name: string;
  rating?: number;
}

interface CFSubmission {
  contestId?: number;
  creationTimeSeconds: number;
  problem: CFProblem;
  verdict: string;
}

interface RawUserInfo {
  handle?: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  avatar?: string;
  organization?: string;
  contribution?: number;
  friendOfCount?: number;
  registrationTimeSeconds?: number;
}

function toDateStr(seconds: number): string {
  return new Date(seconds * 1000).toISOString().split("T")[0];
}

function problemKey(sub: CFSubmission): string {
  return `${sub.problem.contestId ?? sub.contestId}-${sub.problem.index}`;
}

function computeSolvedCount(submissions: CFSubmission[]): number {
  const keys = new Set<string>();
  for (const submission of submissions) {
    if (submission.verdict === "OK") keys.add(problemKey(submission));
  }
  return keys.size;
}

function computeHeatmap(submissions: CFSubmission[]) {
  const dayMap: Record<string, { accepted: number; total: number }> = {};

  for (const submission of submissions) {
    const date = toDateStr(submission.creationTimeSeconds);
    dayMap[date] ??= { accepted: 0, total: 0 };
    dayMap[date].total++;
    if (submission.verdict === "OK") dayMap[date].accepted++;
  }

  const maxAccepted = Math.max(
    0,
    ...Object.values(dayMap).map((day) => day.accepted),
  );
  const days = [];
  const now = new Date();
  const cursor = new Date(now);
  cursor.setDate(cursor.getDate() - 52 * 7 + 1);

  while (cursor <= now) {
    const date = cursor.toISOString().split("T")[0];
    const data = dayMap[date] ?? { accepted: 0, total: 0 };
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (maxAccepted > 0 && data.accepted > 0) {
      const ratio = data.accepted / maxAccepted;
      level = ratio <= 0.25 ? 1 : ratio <= 0.5 ? 2 : ratio <= 0.75 ? 3 : 4;
    }

    days.push({
      date,
      accepted: data.accepted,
      total: data.total,
      level,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function computeStreaks(submissions: CFSubmission[]) {
  const solvedDays = new Set<string>();
  for (const submission of submissions) {
    if (submission.verdict === "OK") {
      solvedDays.add(toDateStr(submission.creationTimeSeconds));
    }
  }

  let currentStreak = 0;
  const cursor = new Date();
  const today = cursor.toISOString().split("T")[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split("T")[0];

  if (solvedDays.has(today) || solvedDays.has(yesterday)) {
    if (!solvedDays.has(today)) cursor.setDate(cursor.getDate() - 1);
    while (solvedDays.has(cursor.toISOString().split("T")[0])) {
      currentStreak++;
      cursor.setDate(cursor.getDate() - 1);
    }
  }

  let longestStreak = 0;
  const sortedDays = [...solvedDays].sort();
  for (let index = 0, run = 0; index < sortedDays.length; index++) {
    if (index === 0) {
      run = 1;
    } else {
      const diffDays =
        (new Date(sortedDays[index]).getTime() -
          new Date(sortedDays[index - 1]).getTime()) /
        86400000;
      run = diffDays === 1 ? run + 1 : 1;
    }
    longestStreak = Math.max(longestStreak, run);
  }

  return { currentStreak, longestStreak };
}

function computeProblemsSolvedPerContest(
  submissions: CFSubmission[],
): Record<number, number> {
  const perContest: Record<number, Set<string>> = {};

  for (const submission of submissions) {
    if (submission.verdict !== "OK") continue;
    const contestId = submission.contestId ?? submission.problem.contestId;
    if (!contestId) continue;
    perContest[contestId] ??= new Set();
    perContest[contestId].add(problemKey(submission));
  }

  return Object.fromEntries(
    Object.entries(perContest).map(([contestId, solved]) => [
      Number(contestId),
      solved.size,
    ]),
  );
}

function computeAverageSolvedRating(submissions: CFSubmission[]) {
  const solved = new Set<string>();
  const ratings: number[] = [];

  for (const submission of submissions) {
    if (submission.verdict !== "OK") continue;
    const key = problemKey(submission);
    if (solved.has(key)) continue;
    solved.add(key);
    if (submission.problem.rating) ratings.push(submission.problem.rating);
  }

  return ratings.length > 0
    ? Math.round(ratings.reduce((total, rating) => total + rating, 0) / ratings.length)
    : 0;
}

function computeHardestSolved(submissions: CFSubmission[]) {
  const solved = new Set<string>();
  let hardest: CFProblem | null = null;

  for (const submission of submissions) {
    if (submission.verdict !== "OK") continue;
    const key = problemKey(submission);
    if (solved.has(key)) continue;
    solved.add(key);
    if (
      submission.problem.rating &&
      (!hardest || (hardest.rating ?? 0) < submission.problem.rating)
    ) {
      hardest = submission.problem;
    }
  }

  return hardest;
}

function computeInsights(
  userInfo: { contribution: number },
  submissions: CFSubmission[],
  ratingHistory: CFRatingEntry[],
) {
  const solved = new Set<string>();
  const monthMap: Record<string, number> = {};
  const weekdayMap: Record<string, number> = {};
  const yearMap: Record<string, number> = {};
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (const submission of submissions) {
    if (submission.verdict !== "OK") continue;
    const key = problemKey(submission);
    if (solved.has(key)) continue;
    solved.add(key);

    const date = new Date(submission.creationTimeSeconds * 1000);
    const month = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    const weekday = weekdays[date.getDay()];
    const year = String(date.getFullYear());

    monthMap[month] = (monthMap[month] ?? 0) + 1;
    weekdayMap[weekday] = (weekdayMap[weekday] ?? 0) + 1;
    yearMap[year] = (yearMap[year] ?? 0) + 1;
  }

  const favoriteMonth = Object.entries(monthMap).sort(([, a], [, b]) => b - a)[0];
  const favoriteWeekday = Object.entries(weekdayMap).sort(([, a], [, b]) => b - a)[0];
  const mostActiveYear = Object.entries(yearMap).sort(([, a], [, b]) => b - a)[0];
  const avgContestRank =
    ratingHistory.length > 0
      ? Math.round(
          ratingHistory.reduce((sum, entry) => sum + entry.rank, 0) /
            ratingHistory.length,
        )
      : 0;
  const avgRatingGain =
    ratingHistory.length > 0
      ? Math.round(
          ratingHistory.reduce(
            (sum, entry) => sum + (entry.newRating - entry.oldRating),
            0,
          ) / ratingHistory.length,
        )
      : 0;
  const activeDays = new Set(
    submissions.map((submission) => toDateStr(submission.creationTimeSeconds)),
  ).size;
  const codingDays = new Set(
    submissions
      .filter((submission) => submission.verdict === "OK")
      .map((submission) => toDateStr(submission.creationTimeSeconds)),
  ).size;
  const avgDailySolves = codingDays > 0 ? (solved.size / codingDays).toFixed(2) : "0";

  return [
    {
      label: "Most Productive Month",
      value: favoriteMonth ? favoriteMonth[0] : "-",
      sub: favoriteMonth ? `${favoriteMonth[1]} problems solved` : "",
      icon: "calendar",
    },
    {
      label: "Best Weekday",
      value: favoriteWeekday ? favoriteWeekday[0] : "-",
      sub: favoriteWeekday ? `${favoriteWeekday[1]} problems solved` : "",
      icon: "week",
    },
    {
      label: "Most Active Year",
      value: mostActiveYear ? mostActiveYear[0] : "-",
      sub: mostActiveYear ? `${mostActiveYear[1]} problems solved` : "",
      icon: "year",
    },
    {
      label: "Average Contest Rank",
      value: avgContestRank > 0 ? `#${avgContestRank.toLocaleString()}` : "-",
      sub: `across ${ratingHistory.length} contests`,
      icon: "rank",
    },
    {
      label: "Average Rating Gain",
      value: `${avgRatingGain > 0 ? "+" : ""}${avgRatingGain}`,
      sub: "per contest",
      icon: "rating",
    },
    {
      label: "Total Active Days",
      value: `${activeDays.toLocaleString()} days`,
      sub: "days with any submission",
      icon: "activity",
    },
    {
      label: "Total Coding Days",
      value: `${codingDays.toLocaleString()} days`,
      sub: "days with at least 1 AC",
      icon: "code",
    },
    {
      label: "Average Daily Solves",
      value: avgDailySolves,
      sub: "on active days",
      icon: "average",
    },
    {
      label: "CF Contribution",
      value: `${userInfo.contribution > 0 ? "+" : ""}${userInfo.contribution}`,
      sub: "community contribution score",
      icon: "contribution",
    },
    {
      label: "Total Problems Solved",
      value: solved.size.toLocaleString(),
      sub: "unique accepted problems",
      icon: "solved",
    },
  ];
}

export async function GET() {
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch("https://codeforces.com/api/user.info?handles=Hasnat0006", {
        next: { revalidate: 3600 },
      }),
      fetch("https://codeforces.com/api/user.rating?handle=Hasnat0006", {
        next: { revalidate: 3600 },
      }),
      fetch(
        "https://codeforces.com/api/user.status?handle=Hasnat0006&from=1&count=10000",
        { next: { revalidate: 3600 } },
      ),
    ]);

    if (!infoRes.ok || !ratingRes.ok || !statusRes.ok) {
      return NextResponse.json(
        { error: "Codeforces API error" },
        { status: 502 },
      );
    }

    const infoData = await infoRes.json();
    const ratingData = await ratingRes.json();
    const statusData = await statusRes.json();

    if (
      infoData.status !== "OK" ||
      ratingData.status !== "OK" ||
      statusData.status !== "OK"
    ) {
      return NextResponse.json(
        { error: "Codeforces API returned non-OK status" },
        { status: 502 },
      );
    }

    const rawUser: RawUserInfo = infoData.result?.[0] ?? {};
    const ratingHistory: CFRatingEntry[] = (ratingData.result ?? []).map(
      (entry: CFRatingEntry) => ({
        contestId: entry.contestId,
        contestName: entry.contestName,
        handle: entry.handle,
        rank: entry.rank,
        ratingUpdateTimeSeconds: entry.ratingUpdateTimeSeconds,
        oldRating: entry.oldRating,
        newRating: entry.newRating,
      }),
    );
    const submissions: CFSubmission[] = (statusData.result ?? []).map(
      (submission: CFSubmission) => ({
        contestId: submission.contestId,
        creationTimeSeconds: submission.creationTimeSeconds,
        problem: {
          contestId: submission.problem.contestId,
          index: submission.problem.index,
          name: submission.problem.name,
          rating: submission.problem.rating,
        },
        verdict: submission.verdict ?? "UNKNOWN",
      }),
    );

    const userInfo = {
      handle: rawUser.handle ?? "Hasnat0006",
      rating: rawUser.rating ?? 0,
      maxRating: rawUser.maxRating ?? 0,
      rank: rawUser.rank ?? "unrated",
      maxRank: rawUser.maxRank ?? "unrated",
      avatar: rawUser.avatar ?? "",
      organization: rawUser.organization ?? "",
      contribution: rawUser.contribution ?? 0,
      friendOfCount: rawUser.friendOfCount ?? 0,
      registrationTimeSeconds: rawUser.registrationTimeSeconds ?? 0,
    };

    const solvedCount = computeSolvedCount(submissions);
    const { currentStreak, longestStreak } = computeStreaks(submissions);
    const averageSolvedRating = computeAverageSolvedRating(submissions);
    const hardestSolved = computeHardestSolved(submissions);
    const acceptedSubmissions = submissions.filter(
      (submission) => submission.verdict === "OK",
    ).length;
    const acceptanceRate =
      submissions.length > 0
        ? Math.round((acceptedSubmissions / submissions.length) * 100)
        : 0;
    const thirtyDaysAgo = Date.now() / 1000 - 30 * 24 * 60 * 60;
    const isCurrentlyActive = submissions.some(
      (submission) =>
        submission.verdict === "OK" &&
        submission.creationTimeSeconds >= thirtyDaysAgo,
    );
    const problemsSolvedPerContest =
      computeProblemsSolvedPerContest(submissions);

    const contests = ratingHistory.map((entry) => ({
      contestId: entry.contestId,
      contestName: entry.contestName,
      date: new Date(entry.ratingUpdateTimeSeconds * 1000).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      ),
      rank: entry.rank,
      oldRating: entry.oldRating,
      newRating: entry.newRating,
      delta: entry.newRating - entry.oldRating,
      problemsSolved: problemsSolvedPerContest[entry.contestId] ?? 0,
    }));

    return NextResponse.json({
      userInfo,
      ratingHistory,
      stats: {
        solved: { count: solvedCount },
        totalSubmissions: submissions.length,
        acceptanceRate,
        heatmap: computeHeatmap(submissions),
        contests,
        currentStreak,
        longestStreak,
        averageSolvedRating,
        hardestSolved,
        isCurrentlyActive,
        insights: computeInsights(userInfo, submissions, ratingHistory),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Codeforces API error" },
      { status: 500 },
    );
  }
}
