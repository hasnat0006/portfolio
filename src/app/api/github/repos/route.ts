import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  topics: string[];
};

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/hasnat0006/repos?per_page=100&sort=updated",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch repos" }, { status: 500 });
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter out forks, map to essential fields
    const filtered = repos
      .filter((r) => !r.fork)
      .map((r) => ({
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.updated_at,
        topics: r.topics,
      }));

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
  }
}
