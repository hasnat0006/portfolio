import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch("https://codeforces.com/api/user.info?handles=Hasnat0006", {
        next: { revalidate: 3600 },
      }),
      fetch("https://codeforces.com/api/user.rating?handle=Hasnat0006", {
        next: { revalidate: 3600 },
      }),
      fetch("https://codeforces.com/api/user.status?handle=Hasnat0006&from=1&count=10000", {
        next: { revalidate: 3600 },
      }),
    ]);

    const infoData = await infoRes.json();
    const ratingData = await ratingRes.json();
    const statusData = await statusRes.json();

    const userInfo = infoData.result?.[0] || {};

    // Rating history for graph
    const ratingHistory = (ratingData.result || []).map(
      (entry: { contestName: string; newRating: number; ratingUpdateTimeSeconds: number; rank: number }) => ({
        contestName: entry.contestName,
        rating: entry.newRating,
        date: new Date(entry.ratingUpdateTimeSeconds * 1000).toISOString(),
        rank: entry.rank,
      })
    );

    // Count unique solved problems
    const solvedSet = new Set<string>();
    const verdictMap: Record<string, number> = {};

    for (const sub of statusData.result || []) {
      const verdict = (sub as { verdict?: string }).verdict || "UNKNOWN";
      verdictMap[verdict] = (verdictMap[verdict] || 0) + 1;

      if (verdict === "OK") {
        const problem = sub as { problem: { contestId?: number; index?: string; name: string } };
        const key = `${problem.problem.contestId}-${problem.problem.index}`;
        solvedSet.add(key);
      }
    }

    return NextResponse.json({
      handle: userInfo.handle || "Hasnat0006",
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || "unrated",
      maxRank: userInfo.maxRank || "unrated",
      avatar: userInfo.avatar,
      organization: userInfo.organization,
      problemsSolved: solvedSet.size,
      totalSubmissions: (statusData.result || []).length,
      ratingHistory,
      verdicts: Object.entries(verdictMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .map(([verdict, count]) => ({ verdict, count })),
    });
  } catch {
    return NextResponse.json({ error: "Codeforces API error" }, { status: 500 });
  }
}
