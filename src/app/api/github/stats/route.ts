// GitHub Engineering Analytics Dashboard — API Route
// Computes all analytics server-side to keep client payload small.

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const USERNAME = "hasnat0006";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const STALE_TTL_MS = 4 * 60 * 60 * 1000; // serve stale up to 4 hours

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;

function getCached(): { data: unknown; stale: boolean } | null {
  if (!memoryCache) return null;
  const age = Date.now() - memoryCache.timestamp;
  if (age < CACHE_TTL_MS) return { data: memoryCache.data, stale: false };
  if (age < STALE_TTL_MS) return { data: memoryCache.data, stale: true };
  return null;
}

function setCache(data: unknown): void {
  memoryCache = { data, timestamp: Date.now() };
}

function isRateLimitError(res: Response): boolean {
  if (res.status === 403 || res.status === 429) {
    return true;
  }
  return false;
}

const REST_HEADERS: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

// ── GraphQL Query ────────────────────────────────────────────────────────────

const GQL_QUERY = `
query GitHubDashboard($login: String!) {
  user(login: $login) {
    name
    login
    bio
    avatarUrl
    company
    location
    websiteUrl
    createdAt
    followers { totalCount }
    following { totalCount }
    repositories(
      first: 100
      ownerAffiliations: OWNER
      isFork: false
      privacy: PUBLIC
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      totalCount
      nodes {
        name
        description
        url
        homepageUrl
        stargazerCount
        forkCount
        primaryLanguage { name color }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name color } }
        }
        repositoryTopics(first: 10) { nodes { topic { name } } }
        createdAt
        updatedAt
        pushedAt
        diskUsage
        isArchived
        licenseInfo { name spdxId }
        defaultBranchRef {
          target {
            ... on Commit { history { totalCount } }
          }
        }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            weekday
          }
        }
      }
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoriesWithContributedCommits
      totalPullRequestReviewContributions
      totalRepositoryContributions
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name color }
          homepageUrl
          repositoryTopics(first: 8) { nodes { topic { name } } }
        }
      }
    }
  }
}
`;

// ── Types ────────────────────────────────────────────────────────────────────

interface GQLRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  languages: {
    edges: { size: number; node: { name: string; color: string } }[];
  };
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  diskUsage: number; // KB
  isArchived: boolean;
  licenseInfo: { name: string; spdxId: string } | null;
  defaultBranchRef: { target: { history: { totalCount: number } } } | null;
}

interface ContribDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

interface GQLUser {
  name: string | null;
  login: string;
  bio: string | null;
  avatarUrl: string;
  company: string | null;
  location: string | null;
  websiteUrl: string | null;
  createdAt: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: { totalCount: number; nodes: GQLRepo[] };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: { contributionDays: ContribDay[] }[];
    };
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    totalRepositoriesWithContributedCommits: number;
    totalPullRequestReviewContributions: number;
    totalRepositoryContributions: number;
  };
  pinnedItems: {
    nodes: Array<{
      name: string;
      description: string | null;
      url: string;
      stargazerCount: number;
      forkCount: number;
      primaryLanguage: { name: string; color: string } | null;
      homepageUrl: string | null;
      repositoryTopics: { nodes: { topic: { name: string } }[] };
    }>;
  };
}

interface GHEvent {
  id: string;
  type: string;
  actor: { login: string };
  repo: { name: string; url: string };
  payload: Record<string, unknown>;
  created_at: string;
  public: boolean;
}

// ── Computation helpers ───────────────────────────────────────────────────────

function computeLanguageDistribution(repos: GQLRepo[]) {
  const byteMap: Record<
    string,
    { bytes: number; color: string; repoCount: number }
  > = {};
  for (const repo of repos) {
    for (const edge of repo.languages.edges) {
      const { name, color } = edge.node;
      if (!byteMap[name]) byteMap[name] = { bytes: 0, color, repoCount: 0 };
      byteMap[name].bytes += edge.size;
      byteMap[name].repoCount += 1;
    }
  }
  const total = Object.values(byteMap).reduce((s, v) => s + v.bytes, 0) || 1;
  return Object.entries(byteMap)
    .sort(([, a], [, b]) => b.bytes - a.bytes)
    .slice(0, 12)
    .map(([name, v]) => ({
      name,
      color: v.color || "#8b949e",
      bytes: v.bytes,
      repoCount: v.repoCount,
      percentage: Math.round((v.bytes / total) * 100),
    }));
}

function computeHeatmap(weeks: { contributionDays: ContribDay[] }[]) {
  // Last 52 weeks × 7 days = 364 days
  const allDays: ContribDay[] = [];
  for (const week of weeks) {
    for (const day of week.contributionDays) allDays.push(day);
  }
  // Keep last 364 days
  const recent = allDays.slice(-364);
  const maxCount = Math.max(...recent.map((d) => d.contributionCount), 1);
  return recent.map((d) => {
    const c = d.contributionCount;
    const pct = c / maxCount;
    const level: 0 | 1 | 2 | 3 | 4 =
      c === 0 ? 0 : pct <= 0.25 ? 1 : pct <= 0.5 ? 2 : pct <= 0.75 ? 3 : 4;
    return { date: d.date, count: c, level };
  });
}

function computeStreaks(weeks: { contributionDays: ContribDay[] }[]) {
  const allDays: ContribDay[] = [];
  for (const week of weeks)
    for (const day of week.contributionDays) allDays.push(day);

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // Current streak (from today or yesterday backward)
  let current = 0;
  const reversed = [...allDays].reverse();
  const start =
    reversed[0]?.date === today || reversed[0]?.date === yesterday ? 0 : -1;
  if (start >= 0) {
    for (const day of reversed) {
      if (day.contributionCount > 0) current++;
      else break;
    }
  }

  // Longest streak
  let longest = 0;
  let running = 0;
  for (const day of allDays) {
    if (day.contributionCount > 0) {
      running++;
      if (running > longest) longest = running;
    } else {
      running = 0;
    }
  }

  return { currentStreak: current, longestStreak: longest };
}

function computeActivityTimeline(events: GHEvent[]) {
  const items: {
    type: string;
    repo: string;
    repoUrl: string;
    description: string;
    date: string;
    icon: string;
    url: string | null;
    message?: string | null;
  }[] = [];

  const githubRepoUrl = (name: string) => `https://github.com/${name}`;

  for (const ev of events.slice(0, 50)) {
    let item: (typeof items)[0] | null = null;

    if (ev.type === "PushEvent") {
      const commits =
        (ev.payload.commits as Array<{ message: string }> | undefined) ?? [];
      const count = (ev.payload.size as number | undefined) ?? commits.length;
      if (count === 0) continue; // skip empty pushes
      const lastMsg =
        commits.length > 0 ? commits[commits.length - 1].message : null;
      const msgLine = lastMsg ? lastMsg.split("\n")[0] : null;
      item = {
        type: "push",
        repo: ev.repo.name,
        repoUrl: githubRepoUrl(ev.repo.name),
        description:
          msgLine ?? `Pushed ${count} commit${count !== 1 ? "s" : ""}`,
        date: ev.created_at,
        icon: "commit",
        url: githubRepoUrl(ev.repo.name),
        message: lastMsg,
      };
    } else if (ev.type === "PullRequestEvent") {
      const action = (ev.payload.action as string | undefined) ?? "";
      const prUrl =
        (ev.payload.pull_request as { html_url?: string } | undefined)
          ?.html_url ?? null;
      item = {
        type: "pr",
        repo: ev.repo.name,
        repoUrl: githubRepoUrl(ev.repo.name),
        description: `${action.charAt(0).toUpperCase() + action.slice(1)} pull request`,
        date: ev.created_at,
        icon: "pr",
        url: prUrl,
      };
    } else if (ev.type === "IssuesEvent") {
      const action = (ev.payload.action as string | undefined) ?? "";
      const issueUrl =
        (ev.payload.issue as { html_url?: string } | undefined)?.html_url ??
        null;
      item = {
        type: "issue",
        repo: ev.repo.name,
        repoUrl: githubRepoUrl(ev.repo.name),
        description: `${action.charAt(0).toUpperCase() + action.slice(1)} issue`,
        date: ev.created_at,
        icon: "issue",
        url: issueUrl,
      };
    } else if (ev.type === "CreateEvent") {
      const refType = (ev.payload.ref_type as string | undefined) ?? "";
      item = {
        type: "create",
        repo: ev.repo.name,
        repoUrl: githubRepoUrl(ev.repo.name),
        description: `Created ${refType}`,
        date: ev.created_at,
        icon: "create",
        url: githubRepoUrl(ev.repo.name),
      };
    } else if (ev.type === "ReleaseEvent") {
      const tag =
        (ev.payload.release as { tag_name?: string } | undefined)?.tag_name ??
        "";
      const releaseUrl =
        (ev.payload.release as { html_url?: string } | undefined)?.html_url ??
        null;
      item = {
        type: "release",
        repo: ev.repo.name,
        repoUrl: githubRepoUrl(ev.repo.name),
        description: `Released ${tag}`,
        date: ev.created_at,
        icon: "release",
        url: releaseUrl,
      };
    } else if (ev.type === "WatchEvent") {
      item = {
        type: "star",
        repo: ev.repo.name,
        repoUrl: githubRepoUrl(ev.repo.name),
        description: "Starred repository",
        date: ev.created_at,
        icon: "star",
        url: githubRepoUrl(ev.repo.name),
      };
    } else if (ev.type === "ForkEvent") {
      item = {
        type: "fork",
        repo: ev.repo.name,
        repoUrl: githubRepoUrl(ev.repo.name),
        description: "Forked repository",
        date: ev.created_at,
        icon: "fork",
        url: githubRepoUrl(ev.repo.name),
      };
    }

    if (item) items.push(item);
    if (items.length >= 20) break;
  }
  return items;
}

/**
 * Fallback: synthesise recent-push timeline items from GraphQL repo data.
 * Used when the public events API returns too few results (rate-limited or
 * the account has no public events in the last 90 days).
 */
function computeActivityFromRepos(repos: GQLRepo[], limit = 20) {
  return repos
    .filter((r) => r.pushedAt)
    .sort(
      (a, b) =>
        new Date(b.pushedAt!).getTime() - new Date(a.pushedAt!).getTime(),
    )
    .slice(0, limit)
    .map((r) => ({
      type: "push",
      repo: `${USERNAME}/${r.name}`,
      repoUrl: r.url,
      description: r.description
        ? `Updated: ${r.description.slice(0, 72)}`
        : "Pushed commits",
      date: r.pushedAt!,
      icon: "commit",
      url: r.url,
    }));
}

// ── GET handler ───────────────────────────────────────────────────────────────

export async function GET() {
  // ── Check cache first ───────────────────────────────────────────
  const cached = getCached();
  if (cached && !cached.stale) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  // ── Token check ─────────────────────────────────────────────────
  if (!GITHUB_TOKEN) {
    if (cached) {
      return NextResponse.json(cached.data, {
        headers: {
          "X-Cache": "STALE",
          "X-Cache-Warning": "Token missing, serving stale data",
        },
      });
    }
    return NextResponse.json(
      { error: "GitHub token is not configured" },
      { status: 503 },
    );
  }

  try {
    let gqlUser: GQLUser | null = null;
    let gqlLimited = false;
    try {
      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GQL_QUERY,
          variables: { login: USERNAME },
        }),
        next: { revalidate: 3600 },
      });
      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        gqlUser = gqlData?.data?.user ?? null;
      } else if (isRateLimitError(gqlRes)) {
        gqlLimited = true;
      }
    } catch {
      // GraphQL failed gracefully; REST fallback below still uses the token.
    }

    // If GraphQL was rate limited and we have stale cache, serve it
    if (gqlLimited && cached) {
      return NextResponse.json(cached.data, {
        headers: {
          "X-Cache": "STALE",
          "X-Cache-Warning": "GitHub API rate limited",
        },
      });
    }

    const [userRes, eventsRes] = await Promise.all([
      gqlUser
        ? Promise.resolve(null)
        : fetch(`https://api.github.com/users/${USERNAME}`, {
            headers: REST_HEADERS,
            next: { revalidate: 3600 },
          }),
      fetch(
        `https://api.github.com/users/${USERNAME}/events/public?per_page=30`,
        {
          headers: REST_HEADERS,
          next: { revalidate: 3600 },
        },
      ),
    ]);

    // If core requests are rate limited, serve stale cache
    const userRateLimited = userRes && isRateLimitError(userRes);
    const eventsRateLimited = isRateLimitError(eventsRes);
    if (cached && (userRateLimited || eventsRateLimited)) {
      return NextResponse.json(cached.data, {
        headers: {
          "X-Cache": "STALE",
          "X-Cache-Warning": "GitHub API rate limited",
        },
      });
    }

    const restUser = userRes?.ok ? await userRes.json() : null;
    const events: GHEvent[] = eventsRes.ok ? await eventsRes.json() : [];

    // Fetch profile view count from komarev badge service
    let profileViews = 0;
    try {
      const pvRes = await fetch(
        "https://komarev.com/ghpvc/?username=hasnat0006",
        {
          next: { revalidate: 3600 },
        },
      );
      if (pvRes.ok) {
        const svg = await pvRes.text();
        const match = svg.match(/>([0-9,]+)<\/text>\s*$/m);
        if (match) {
          profileViews = parseInt(match[1].replace(/,/g, ""), 10);
        }
      }
    } catch {
      // Profile view counter unavailable — silently skip
    }

    // Prioritize GraphQL user data, fall back to REST
    const userInfo = {
      login: gqlUser?.login ?? restUser?.login ?? USERNAME,
      name: gqlUser?.name ?? restUser?.name ?? USERNAME,
      bio: gqlUser?.bio ?? restUser?.bio ?? null,
      avatarUrl: gqlUser?.avatarUrl ?? restUser?.avatar_url ?? "",
      htmlUrl: `https://github.com/${USERNAME}`,
      company: gqlUser?.company ?? restUser?.company ?? null,
      location: gqlUser?.location ?? restUser?.location ?? null,
      websiteUrl: gqlUser?.websiteUrl ?? restUser?.blog ?? null,
      createdAt:
        gqlUser?.createdAt ?? restUser?.created_at ?? new Date().toISOString(),
      publicRepos:
        gqlUser?.repositories.totalCount ?? restUser?.public_repos ?? 0,
      publicGists: restUser?.public_gists ?? 0,
      followers: gqlUser?.followers.totalCount ?? restUser?.followers ?? 0,
      following: gqlUser?.following.totalCount ?? restUser?.following ?? 0,
      profileViews,
    };

    // Repos from GraphQL (richer data), fall back to REST
    const repos: GQLRepo[] = gqlUser?.repositories.nodes ?? [];

    // Aggregates
    const totalStars = repos.reduce((s, r) => s + r.stargazerCount, 0);
    const totalForks = repos.reduce((s, r) => s + r.forkCount, 0);

    // Contribution data
    const contribs = gqlUser?.contributionsCollection;
    const calWeeks = contribs?.contributionCalendar.weeks ?? [];
    const totalContributions =
      contribs?.contributionCalendar.totalContributions ?? 0;
    const totalCommitsThisYear = contribs?.totalCommitContributions ?? 0;
    const totalPRs = contribs?.totalPullRequestContributions ?? 0;
    const totalIssues = contribs?.totalIssueContributions ?? 0;
    const totalCodeReviews = contribs?.totalPullRequestReviewContributions ?? 0;
    const totalContributedRepos =
      contribs?.totalRepositoriesWithContributedCommits ?? 0;

    // Heatmap + streaks
    const heatmap = computeHeatmap(calWeeks);
    const { currentStreak, longestStreak } = computeStreaks(calWeeks);

    // Currently active: any contribution in last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const isCurrentlyActive = heatmap.some(
      (d) => d.date >= thirtyDaysAgo && d.count > 0,
    );

    // Languages
    const languages = computeLanguageDistribution(repos);

    // Activity timeline — use public events, fall back to repo push timestamps
    const eventsTimeline = computeActivityTimeline(events);
    const activityTimeline =
      eventsTimeline.length >= 5
        ? eventsTimeline
        : [
            ...eventsTimeline,
            ...computeActivityFromRepos(repos, 20).filter(
              (fb) => !eventsTimeline.some((e) => e.repo === fb.repo),
            ),
          ].slice(0, 20);

    const responseBody = {
      userInfo,
      stats: {
        totalStars,
        totalForks,
        totalCommitsThisYear,
        totalCommits: repos.reduce(
          (s, r) => s + (r.defaultBranchRef?.target.history.totalCount ?? 0),
          0,
        ),
        totalPRs,
        totalIssues,
        totalCodeReviews,
        totalContributions,
        totalContributedRepos,
        currentStreak,
        longestStreak,
        isCurrentlyActive,
      },
      languages,
      heatmap,
      activityTimeline,
    };

    // Store in memory cache
    setCache(responseBody);

    return NextResponse.json(responseBody, {
      headers: {
        "Cache-Control":
          "public, max-age=1800, s-maxage=3600, stale-while-revalidate=14400",
        "X-Cache": "MISS",
      },
    });
  } catch (err) {
    console.error("GitHub dashboard error:", err);

    // Serve stale cache on unexpected errors
    if (cached) {
      return NextResponse.json(cached.data, {
        headers: {
          "X-Cache": "STALE",
          "X-Cache-Warning": "Server error, serving stale data",
        },
      });
    }

    return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
  }
}
