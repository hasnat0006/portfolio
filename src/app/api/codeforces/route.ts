import { NextResponse } from "next/server";

export const revalidate = 3600;

// ── Types matching client-side expectations ───────────────────────────────────

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
  tags: string[];
}

interface CFSubmission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  problem: CFProblem;
  programmingLanguage: string;
  verdict: string;
  passedTestCount: number;
}

interface RawUserInfo {
  handle?: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  avatar?: string;
  titlePhoto?: string;
  organization?: string;
  contribution?: number;
  friendOfCount?: number;
  registrationTimeSeconds?: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toDateStr(seconds: number): string {
  return new Date(seconds * 1000).toISOString().split("T")[0];
}

function problemKey(sub: CFSubmission): string {
  return `${sub.problem.contestId ?? sub.contestId}-${sub.problem.index}`;
}

// ── Server-side computations (to stay under 2MB cache limit) ─────────────────

function computeSolvedCount(submissions: CFSubmission[]): number {
  const keys = new Set<string>();
  for (const s of submissions) {
    if (s.verdict === "OK") keys.add(problemKey(s));
  }
  return keys.size;
}

function computeTopics(submissions: CFSubmission[]) {
  const solved = new Set<string>();
  const counts: Record<string, number> = {};
  for (const s of submissions) {
    if (s.verdict !== "OK") continue;
    const k = problemKey(s);
    if (solved.has(k)) continue;
    solved.add(k);
    for (const tag of s.problem.tags) counts[tag] = (counts[tag] ?? 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([topic, count]) => ({
      topic,
      count,
      percentage: Math.round((count / total) * 100),
    }));
}

function computeRatingDistribution(submissions: CFSubmission[]) {
  const solved = new Set<string>();
  const buckets: Record<number, number> = {};
  for (const s of submissions) {
    if (s.verdict !== "OK") continue;
    const k = problemKey(s);
    if (solved.has(k)) continue;
    solved.add(k);
    if (s.problem.rating)
      buckets[s.problem.rating] = (buckets[s.problem.rating] ?? 0) + 1;
  }
  const total = Object.values(buckets).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(buckets)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([rating, count]) => ({
      rating: Number(rating),
      count,
      percentage: Math.round((count / total) * 100),
    }));
}

function computeLanguages(submissions: CFSubmission[]) {
  const map: Record<string, { total: number; accepted: number }> = {};
  for (const s of submissions) {
    const l = s.programmingLanguage;
    if (!map[l]) map[l] = { total: 0, accepted: 0 };
    map[l].total++;
    if (s.verdict === "OK") map[l].accepted++;
  }
  const DISPLAY: Record<string, string> = {
    "GNU G++17 7.3.0": "C++17",
    "GNU G++20 11.2.0 (64 bit, winlibs)": "C++20",
    "GNU G++14 6.4.0": "C++14",
    "GNU G++17 9.2.0 (64 bit, msys 2)": "C++17",
    "Python 3.8.12": "Python 3",
    "Python 3.9.6": "Python 3",
    "PyPy 3-64": "PyPy 3",
    "Java 11.0.6": "Java 11",
    "Java 17 64bit": "Java 17",
    "Rust 2021": "Rust",
  };
  return Object.entries(map)
    .sort(([, a], [, b]) => b.total - a.total)
    .slice(0, 8)
    .map(([language, stats]) => ({
      language,
      displayName:
        DISPLAY[language] ??
        language
          .replace(/GNU G\+\+\d+/, "C++")
          .replace(/\s+\d[\d.]+.*$/, "")
          .trim(),
      total: stats.total,
      accepted: stats.accepted,
      acceptanceRate:
        stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0,
    }));
}

function computeHeatmap(submissions: CFSubmission[]) {
  const dayMap: Record<string, { accepted: number; total: number }> = {};
  for (const s of submissions) {
    const d = toDateStr(s.creationTimeSeconds);
    if (!dayMap[d]) dayMap[d] = { accepted: 0, total: 0 };
    dayMap[d].total++;
    if (s.verdict === "OK") dayMap[d].accepted++;
  }
  let maxAc = 0;
  for (const v of Object.values(dayMap))
    if (v.accepted > maxAc) maxAc = v.accepted;

  const days = [];
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 52 * 7 + 1);
  const cursor = new Date(start);
  while (cursor <= now) {
    const dateStr = cursor.toISOString().split("T")[0];
    const data = dayMap[dateStr] ?? { accepted: 0, total: 0 };
    const ac = data.accepted;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (maxAc > 0 && ac > 0) {
      const pct = ac / maxAc;
      level = pct <= 0.25 ? 1 : pct <= 0.5 ? 2 : pct <= 0.75 ? 3 : 4;
    }
    days.push({
      date: dateStr,
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
  for (const s of submissions) {
    if (s.verdict === "OK") solvedDays.add(toDateStr(s.creationTimeSeconds));
  }

  // current streak
  let current = 0;
  const check = new Date();
  const today = check.toISOString().split("T")[0];
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  const yesterday = yest.toISOString().split("T")[0];
  if (solvedDays.has(today) || solvedDays.has(yesterday)) {
    if (!solvedDays.has(today)) check.setDate(check.getDate() - 1);
    while (solvedDays.has(check.toISOString().split("T")[0])) {
      current++;
      check.setDate(check.getDate() - 1);
    }
  }

  // longest streak
  let longest = 0;
  if (solvedDays.size > 0) {
    const sorted = [...solvedDays].sort();
    let cur2 = 1;
    longest = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff =
        (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) /
        86400000;
      if (diff === 1) {
        cur2++;
        if (cur2 > longest) longest = cur2;
      } else cur2 = 1;
    }
  }

  return { currentStreak: current, longestStreak: longest };
}

function computeProblemsSolvedPerContest(
  submissions: CFSubmission[],
): Record<number, number> {
  const perContest: Record<number, Set<string>> = {};
  for (const s of submissions) {
    if (s.verdict !== "OK") continue;
    const cid = s.contestId ?? s.problem.contestId;
    if (!cid) continue;
    if (!perContest[cid]) perContest[cid] = new Set();
    perContest[cid].add(problemKey(s));
  }
  const result: Record<number, number> = {};
  for (const [cid, keys] of Object.entries(perContest)) {
    result[Number(cid)] = keys.size;
  }
  return result;
}

function computeAverageSolvedRating(submissions: CFSubmission[]) {
  const solved = new Set<string>();
  const ratings: number[] = [];
  for (const s of submissions) {
    if (s.verdict !== "OK") continue;
    const k = problemKey(s);
    if (solved.has(k)) continue;
    solved.add(k);
    if (s.problem.rating) ratings.push(s.problem.rating);
  }
  return ratings.length > 0
    ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
    : 0;
}

function computeHardestSolved(submissions: CFSubmission[]) {
  const solved = new Set<string>();
  let hardest: CFProblem | null = null;
  for (const s of submissions) {
    if (s.verdict !== "OK") continue;
    const k = problemKey(s);
    if (solved.has(k)) continue;
    solved.add(k);
    if (
      s.problem.rating &&
      (!hardest || (hardest.rating ?? 0) < s.problem.rating)
    ) {
      hardest = s.problem;
    }
  }
  return hardest;
}

function computeRecentProblems(submissions: CFSubmission[]) {
  const seen = new Set<string>();
  const recent = [];
  const sorted = [...submissions].sort(
    (a, b) => b.creationTimeSeconds - a.creationTimeSeconds,
  );
  for (const s of sorted) {
    if (s.verdict !== "OK") continue;
    const k = problemKey(s);
    if (seen.has(k)) continue;
    seen.add(k);
    const cid = s.problem.contestId ?? s.contestId;
    recent.push({
      id: s.id,
      contestId: cid,
      problemIndex: s.problem.index,
      problemName: s.problem.name,
      problemRating: s.problem.rating,
      tags: s.problem.tags,
      language: s.programmingLanguage,
      verdict: s.verdict,
      submittedAt: new Date(s.creationTimeSeconds * 1000).toISOString(),
      url: cid
        ? `https://codeforces.com/contest/${cid}/problem/${s.problem.index}`
        : `https://codeforces.com/problemset`,
    });
    if (recent.length >= 12) break;
  }
  return recent;
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
  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (const s of submissions) {
    if (s.verdict !== "OK") continue;
    const k = problemKey(s);
    if (solved.has(k)) continue;
    solved.add(k);
    const d = new Date(s.creationTimeSeconds * 1000);
    const month = d.toLocaleString("en-US", { month: "long", year: "numeric" });
    monthMap[month] = (monthMap[month] ?? 0) + 1;
    weekdayMap[WEEKDAYS[d.getDay()]] =
      (weekdayMap[WEEKDAYS[d.getDay()]] ?? 0) + 1;
    yearMap[String(d.getFullYear())] =
      (yearMap[String(d.getFullYear())] ?? 0) + 1;
  }

  const favoriteMonth = Object.entries(monthMap).sort(
    ([, a], [, b]) => b - a,
  )[0];
  const favoriteWeekday = Object.entries(weekdayMap).sort(
    ([, a], [, b]) => b - a,
  )[0];
  const mostActiveYear = Object.entries(yearMap).sort(
    ([, a], [, b]) => b - a,
  )[0];
  const avgContestRank =
    ratingHistory.length > 0
      ? Math.round(
          ratingHistory.reduce((s, e) => s + e.rank, 0) / ratingHistory.length,
        )
      : 0;
  const avgRatingGain =
    ratingHistory.length > 0
      ? Math.round(
          ratingHistory.reduce((s, e) => s + (e.newRating - e.oldRating), 0) /
            ratingHistory.length,
        )
      : 0;
  const activeDays = new Set(
    submissions.map((s) => toDateStr(s.creationTimeSeconds)),
  ).size;
  const codingDays = new Set(
    submissions
      .filter((s) => s.verdict === "OK")
      .map((s) => toDateStr(s.creationTimeSeconds)),
  ).size;
  const avgDailySolves =
    codingDays > 0 ? (solved.size / codingDays).toFixed(2) : "0";

  return [
    {
      label: "Most Productive Month",
      value: favoriteMonth ? favoriteMonth[0] : "—",
      sub: favoriteMonth ? `${favoriteMonth[1]} problems solved` : "",
      icon: "📆",
    },
    {
      label: "Best Weekday",
      value: favoriteWeekday ? favoriteWeekday[0] : "—",
      sub: favoriteWeekday ? `${favoriteWeekday[1]} problems solved` : "",
      icon: "📅",
    },
    {
      label: "Most Active Year",
      value: mostActiveYear ? mostActiveYear[0] : "—",
      sub: mostActiveYear ? `${mostActiveYear[1]} problems solved` : "",
      icon: "🗓️",
    },
    {
      label: "Average Contest Rank",
      value: avgContestRank > 0 ? `#${avgContestRank.toLocaleString()}` : "—",
      sub: `across ${ratingHistory.length} contests`,
      icon: "🏅",
    },
    {
      label: "Average Rating Gain",
      value: `${avgRatingGain > 0 ? "+" : ""}${avgRatingGain}`,
      sub: "per contest",
      icon: avgRatingGain >= 0 ? "📈" : "📉",
    },
    {
      label: "Total Active Days",
      value: `${activeDays.toLocaleString()} days`,
      sub: "days with any submission",
      icon: "⚡",
    },
    {
      label: "Total Coding Days",
      value: `${codingDays.toLocaleString()} days`,
      sub: "days with at least 1 AC",
      icon: "💻",
    },
    {
      label: "Average Daily Solves",
      value: avgDailySolves,
      sub: "on active days",
      icon: "📊",
    },
    {
      label: "CF Contribution",
      value: `${userInfo.contribution > 0 ? "+" : ""}${userInfo.contribution}`,
      sub: "community contribution score",
      icon: "🤝",
    },
    {
      label: "Total Problems Solved",
      value: solved.size.toLocaleString(),
      sub: "unique accepted problems",
      icon: "✅",
    },
  ];
}

function computeAchievements(
  maxRating: number,
  maxRank: string,
  solvedCount: number,
  contestCount: number,
  longestStreak: number,
  hardestRating: number,
  averageSolvedRating: number,
) {
  const rank = maxRank.toLowerCase();
  function badge(
    id: string,
    title: string,
    description: string,
    icon: string,
    cond: boolean,
    tier: string,
  ) {
    return { id, title, description, icon, unlocked: cond, tier };
  }
  const RANK_INCLUDES = (ranks: string[]) => ranks.includes(rank);

  return [
    badge(
      "solved_100",
      "Century Club",
      "Solved 100+ problems",
      "💯",
      solvedCount >= 100,
      "bronze",
    ),
    badge(
      "solved_250",
      "Problem Hunter",
      "Solved 250+ problems",
      "🎯",
      solvedCount >= 250,
      "bronze",
    ),
    badge(
      "solved_500",
      "Half Millennium",
      "Solved 500+ problems",
      "⚡",
      solvedCount >= 500,
      "silver",
    ),
    badge(
      "solved_1000",
      "Problem Master",
      "Solved 1000+ problems",
      "🏆",
      solvedCount >= 1000,
      "gold",
    ),
    badge(
      "solved_1500",
      "Elite Solver",
      "Solved 1500+ problems",
      "👑",
      solvedCount >= 1500,
      "platinum",
    ),
    badge(
      "solved_2000",
      "Legendary Solver",
      "Solved 2000+ problems",
      "🌟",
      solvedCount >= 2000,
      "platinum",
    ),
    badge(
      "contests_10",
      "Contest Starter",
      "Participated in 10+ contests",
      "🎪",
      contestCount >= 10,
      "bronze",
    ),
    badge(
      "contests_25",
      "Regular Contester",
      "Participated in 25+ contests",
      "🎭",
      contestCount >= 25,
      "silver",
    ),
    badge(
      "contests_50",
      "Contest Veteran",
      "Participated in 50+ contests",
      "🎖️",
      contestCount >= 50,
      "gold",
    ),
    badge(
      "contests_100",
      "Contest Legend",
      "Participated in 100+ contests",
      "🏅",
      contestCount >= 100,
      "platinum",
    ),
    badge(
      "rating_1200",
      "Newbie Graduate",
      "Reached 1200+ rating",
      "📈",
      maxRating >= 1200,
      "bronze",
    ),
    badge(
      "rating_1400",
      "Reached Pupil",
      "Reached 1400+ rating",
      "🌱",
      maxRating >= 1400,
      "bronze",
    ),
    badge(
      "rating_1600",
      "Reached Specialist",
      "Reached 1600+ rating",
      "🔷",
      maxRating >= 1600,
      "silver",
    ),
    badge(
      "rating_1900",
      "Reached Expert",
      "Reached 1900+ rating",
      "💙",
      maxRating >= 1900,
      "silver",
    ),
    badge(
      "rating_2100",
      "Candidate Master",
      "Reached 2100+ rating",
      "💜",
      maxRating >= 2100,
      "gold",
    ),
    badge(
      "rating_2300",
      "Master Tier",
      "Reached 2300+ rating",
      "🔶",
      maxRating >= 2300,
      "gold",
    ),
    badge(
      "rating_2400",
      "International Master",
      "Reached 2400+ rating",
      "🔥",
      maxRating >= 2400,
      "platinum",
    ),
    badge(
      "rating_2600",
      "Grandmaster",
      "Reached 2600+ rating",
      "🌋",
      maxRating >= 2600,
      "platinum",
    ),
    badge(
      "streak_7",
      "Week Warrior",
      "7-day solving streak",
      "🔥",
      longestStreak >= 7,
      "bronze",
    ),
    badge(
      "streak_30",
      "Monthly Grind",
      "30-day solving streak",
      "📅",
      longestStreak >= 30,
      "gold",
    ),
    badge(
      "hardest_2000",
      "Two-K Solver",
      "Solved a 2000-rated problem",
      "💎",
      hardestRating >= 2000,
      "silver",
    ),
    badge(
      "hardest_2500",
      "Elite Problemist",
      "Solved a 2500-rated problem",
      "🌠",
      hardestRating >= 2500,
      "platinum",
    ),
    badge(
      "rank_specialist",
      "Specialist",
      "Achieved Specialist rank",
      "🔷",
      RANK_INCLUDES([
        "specialist",
        "expert",
        "candidate master",
        "master",
        "international master",
        "grandmaster",
        "international grandmaster",
        "legendary grandmaster",
      ]),
      "silver",
    ),
    badge(
      "rank_expert",
      "Expert",
      "Achieved Expert rank",
      "💙",
      RANK_INCLUDES([
        "expert",
        "candidate master",
        "master",
        "international master",
        "grandmaster",
      ]),
      "silver",
    ),
    badge(
      "rank_cm",
      "Candidate Master",
      "Achieved Candidate Master rank",
      "💜",
      RANK_INCLUDES([
        "candidate master",
        "master",
        "international master",
        "grandmaster",
      ]),
      "gold",
    ),
    badge(
      "avg_rating_1500",
      "Quality Solver",
      "Average solved rating 1500+",
      "⭐",
      averageSolvedRating >= 1500,
      "silver",
    ),
  ].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    const t: Record<string, number> = {
      platinum: 0,
      gold: 1,
      silver: 2,
      bronze: 3,
    };
    return (t[a.tier] ?? 3) - (t[b.tier] ?? 3);
  });
}

// ── Route handler ─────────────────────────────────────────────────────────────

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
      (e: CFRatingEntry) => ({
        contestId: e.contestId,
        contestName: e.contestName,
        handle: e.handle,
        rank: e.rank,
        ratingUpdateTimeSeconds: e.ratingUpdateTimeSeconds,
        oldRating: e.oldRating,
        newRating: e.newRating,
      }),
    );
    const submissions: CFSubmission[] = (statusData.result ?? []).map(
      (s: CFSubmission) => ({
        id: s.id,
        contestId: s.contestId,
        creationTimeSeconds: s.creationTimeSeconds,
        problem: {
          contestId: s.problem.contestId,
          index: s.problem.index,
          name: s.problem.name,
          rating: s.problem.rating,
          tags: s.problem.tags,
        },
        programmingLanguage: s.programmingLanguage,
        verdict: s.verdict ?? "UNKNOWN",
        passedTestCount: s.passedTestCount,
      }),
    );

    // ── Compute all analytics server-side ──────────────────────────────────
    const solvedCount = computeSolvedCount(submissions);
    const { currentStreak, longestStreak } = computeStreaks(submissions);
    const averageSolvedRating = computeAverageSolvedRating(submissions);
    const hardestSolved = computeHardestSolved(submissions);
    const acceptanceRate =
      submissions.length > 0
        ? Math.round(
            (submissions.filter((s) => s.verdict === "OK").length /
              submissions.length) *
              100,
          )
        : 0;
    const thirtyDaysAgo = Date.now() / 1000 - 30 * 24 * 60 * 60;
    const isCurrentlyActive = submissions.some(
      (s) => s.verdict === "OK" && s.creationTimeSeconds >= thirtyDaysAgo,
    );
    const avgContestRatingChange =
      ratingHistory.length > 0
        ? Math.round(
            ratingHistory.reduce(
              (sum, e) => sum + (e.newRating - e.oldRating),
              0,
            ) / ratingHistory.length,
          )
        : 0;

    const userInfo = {
      handle: rawUser.handle ?? "Hasnat0006",
      rating: rawUser.rating ?? 0,
      maxRating: rawUser.maxRating ?? 0,
      rank: rawUser.rank ?? "unrated",
      maxRank: rawUser.maxRank ?? "unrated",
      avatar: rawUser.avatar ?? "",
      titlePhoto: rawUser.titlePhoto ?? "",
      organization: rawUser.organization ?? "",
      contribution: rawUser.contribution ?? 0,
      friendOfCount: rawUser.friendOfCount ?? 0,
      registrationTimeSeconds: rawUser.registrationTimeSeconds ?? 0,
    };

    const problemsSolvedPerContest =
      computeProblemsSolvedPerContest(submissions);

    const contests: any[] = ratingHistory.map((e) => ({
      contestId: e.contestId,
      contestName: e.contestName,
      date: new Date(e.ratingUpdateTimeSeconds * 1000).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      ),
      rank: e.rank,
      oldRating: e.oldRating,
      newRating: e.newRating,
      delta: e.newRating - e.oldRating,
      problemsSolved: problemsSolvedPerContest[e.contestId] ?? 0,
    }));

    // Fetch totalParticipants for best contests
    try {
      const topByRank = [...contests]
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 10);
      const participantResults = await Promise.allSettled(
        topByRank.map((c: any) =>
          fetch(
            `https://codeforces.com/api/contest.standings?contestId=${c.contestId}&from=1&count=1`,
            { next: { revalidate: 3600 } },
          )
            .then((r) => r.json())
            .then((d: any) => ({
              contestId: c.contestId,
              total: d.result?.totalParticipants ?? null,
            })),
        ),
      );
      for (const r of participantResults) {
        if (r.status === "fulfilled" && r.value.total != null) {
          const c = contests.find(
            (x: any) => x.contestId === r.value.contestId,
          );
          if (c) c.totalParticipants = r.value.total;
        }
      }
    } catch {
      // Non-critical — totalParticipants stays undefined
    }

    const achievements = computeAchievements(
      userInfo.maxRating,
      userInfo.maxRank,
      solvedCount,
      ratingHistory.length,
      longestStreak,
      hardestSolved?.rating ?? 0,
      averageSolvedRating,
    );

    const insights = computeInsights(userInfo, submissions, ratingHistory);

    return NextResponse.json({
      userInfo,
      ratingHistory,
      stats: {
        solved: { count: solvedCount },
        totalSubmissions: submissions.length,
        acceptanceRate,
        topics: computeTopics(submissions),
        ratingDistribution: computeRatingDistribution(submissions),
        languages: computeLanguages(submissions),
        heatmap: computeHeatmap(submissions),
        contests,
        recentProblems: computeRecentProblems(submissions),
        currentStreak,
        longestStreak,
        averageSolvedRating,
        hardestSolved,
        averageContestRatingChange: avgContestRatingChange,
        isCurrentlyActive,
        achievements,
        insights,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Codeforces API error" },
      { status: 500 },
    );
  }
}
