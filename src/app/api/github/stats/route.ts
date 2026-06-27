import { NextResponse } from "next/server";

export const revalidate = 3600;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
};
if (GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/hasnat0006", {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/hasnat0006/repos?per_page=100", {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      const userError = !userRes.ok ? `user: ${userRes.status}` : "";
      const reposError = !reposRes.ok ? `repos: ${reposRes.status}` : "";
      console.error(`GitHub API error — ${userError} ${reposError}`);
      return NextResponse.json(
        {
          username: "hasnat0006",
          profileUrl: "https://github.com/hasnat0006",
          publicRepos: 0,
          followers: 0,
          totalStars: 0,
          totalForks: 0,
          languages: [],
        },
        { status: 200 },
      );
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Compute aggregate stats
    const ownRepos = repos.filter((r: { fork: boolean }) => !r.fork);
    const totalStars = ownRepos.reduce(
      (sum: number, r: { stargazers_count: number }) =>
        sum + r.stargazers_count,
      0,
    );
    const totalForks = ownRepos.reduce(
      (sum: number, r: { forks_count: number }) => sum + r.forks_count,
      0,
    );

    // Language breakdown
    const langMap: Record<string, number> = {};
    for (const repo of ownRepos) {
      const lang = (repo as { language: string | null }).language;
      if (lang) {
        langMap[lang] = (langMap[lang] || 0) + 1;
      }
    }
    const languages = Object.entries(langMap)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      username: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalForks,
      languages,
    });
  } catch (err) {
    console.error("GitHub stats fetch error:", err);
    return NextResponse.json(
      {
        username: "hasnat0006",
        profileUrl: "https://github.com/hasnat0006",
        publicRepos: 0,
        followers: 0,
        totalStars: 0,
        totalForks: 0,
        languages: [],
      },
      { status: 200 },
    );
  }
}
