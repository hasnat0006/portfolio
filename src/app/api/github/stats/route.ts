// GitHub Engineering Analytics Dashboard — API Route
// Computes all analytics server-side to keep client payload small.

import { NextResponse } from "next/server";

export const revalidate = 3600;

const USERNAME = "hasnat0006";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

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

// ── Tech stack mapping ────────────────────────────────────────────────────────

const TOPIC_TO_TECH: Record<string, { display: string; category: string }> = {
  react: { display: "React", category: "Frontend" },
  reactjs: { display: "React", category: "Frontend" },
  "next-js": { display: "Next.js", category: "Frontend" },
  nextjs: { display: "Next.js", category: "Frontend" },
  typescript: { display: "TypeScript", category: "Language" },
  javascript: { display: "JavaScript", category: "Language" },
  nodejs: { display: "Node.js", category: "Backend" },
  "node-js": { display: "Node.js", category: "Backend" },
  node: { display: "Node.js", category: "Backend" },
  express: { display: "Express", category: "Backend" },
  expressjs: { display: "Express", category: "Backend" },
  python: { display: "Python", category: "Language" },
  fastapi: { display: "FastAPI", category: "Backend" },
  django: { display: "Django", category: "Backend" },
  flask: { display: "Flask", category: "Backend" },
  tailwindcss: { display: "Tailwind CSS", category: "Frontend" },
  tailwind: { display: "Tailwind CSS", category: "Frontend" },
  postgresql: { display: "PostgreSQL", category: "Database" },
  postgres: { display: "PostgreSQL", category: "Database" },
  mongodb: { display: "MongoDB", category: "Database" },
  mysql: { display: "MySQL", category: "Database" },
  redis: { display: "Redis", category: "Database" },
  docker: { display: "Docker", category: "DevOps" },
  kubernetes: { display: "Kubernetes", category: "DevOps" },
  supabase: { display: "Supabase", category: "Backend" },
  firebase: { display: "Firebase", category: "Backend" },
  prisma: { display: "Prisma", category: "Database" },
  graphql: { display: "GraphQL", category: "API" },
  "rest-api": { display: "REST API", category: "API" },
  cpp: { display: "C++", category: "Language" },
  cplusplus: { display: "C++", category: "Language" },
  "c-plus-plus": { display: "C++", category: "Language" },
  rust: { display: "Rust", category: "Language" },
  go: { display: "Go", category: "Language" },
  golang: { display: "Go", category: "Language" },
  java: { display: "Java", category: "Language" },
  "spring-boot": { display: "Spring Boot", category: "Backend" },
  "machine-learning": { display: "Machine Learning", category: "AI/ML" },
  "deep-learning": { display: "Deep Learning", category: "AI/ML" },
  tensorflow: { display: "TensorFlow", category: "AI/ML" },
  pytorch: { display: "PyTorch", category: "AI/ML" },
  opencv: { display: "OpenCV", category: "AI/ML" },
  algorithms: { display: "Algorithms", category: "CS" },
  "data-structures": { display: "Data Structures", category: "CS" },
  "competitive-programming": {
    display: "Competitive Programming",
    category: "CS",
  },
  "three-js": { display: "Three.js", category: "Frontend" },
  threejs: { display: "Three.js", category: "Frontend" },
  "framer-motion": { display: "Framer Motion", category: "Frontend" },
  "github-actions": { display: "GitHub Actions", category: "DevOps" },
  vercel: { display: "Vercel", category: "DevOps" },
  aws: { display: "AWS", category: "Cloud" },
  solidity: { display: "Solidity", category: "Blockchain" },
  ethereum: { display: "Ethereum", category: "Blockchain" },
  web3: { display: "Web3", category: "Blockchain" },
  vue: { display: "Vue.js", category: "Frontend" },
  vuejs: { display: "Vue.js", category: "Frontend" },
  svelte: { display: "Svelte", category: "Frontend" },
  angular: { display: "Angular", category: "Frontend" },
  "socket-io": { display: "Socket.io", category: "Backend" },
  websocket: { display: "WebSocket", category: "Backend" },
  jwt: { display: "JWT", category: "Security" },
  oauth: { display: "OAuth", category: "Security" },
};

const LANG_TO_TECH: Record<string, { display: string; category: string }> = {
  TypeScript: { display: "TypeScript", category: "Language" },
  JavaScript: { display: "JavaScript", category: "Language" },
  Python: { display: "Python", category: "Language" },
  "C++": { display: "C++", category: "Language" },
  Go: { display: "Go", category: "Language" },
  Rust: { display: "Rust", category: "Language" },
  Java: { display: "Java", category: "Language" },
  "C#": { display: "C#", category: "Language" },
  Ruby: { display: "Ruby", category: "Language" },
  PHP: { display: "PHP", category: "Language" },
  Swift: { display: "Swift", category: "Language" },
  Kotlin: { display: "Kotlin", category: "Language" },
  Dart: { display: "Dart", category: "Language" },
};

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

function computeTechStack(repos: GQLRepo[]) {
  const techCount: Record<
    string,
    { display: string; category: string; count: number }
  > = {};

  const add = (key: string, info: { display: string; category: string }) => {
    const d = info.display;
    if (!techCount[d]) techCount[d] = { ...info, count: 0 };
    techCount[d].count += 1;
  };

  for (const repo of repos) {
    // From topics
    for (const { topic } of repo.repositoryTopics.nodes) {
      const info = TOPIC_TO_TECH[topic.name.toLowerCase()];
      if (info) add(topic.name, info);
    }
    // From primary language
    if (repo.primaryLanguage) {
      const info = LANG_TO_TECH[repo.primaryLanguage.name];
      if (info) add(repo.primaryLanguage.name, info);
    }
  }

  return Object.values(techCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 24);
}

function computeFeaturedRepos(repos: GQLRepo[]) {
  const now = Date.now();
  return repos
    .filter((r) => !r.isArchived && r.description)
    .map((r) => {
      const daysSinceUpdate =
        (now - new Date(r.updatedAt).getTime()) / 86400000;
      const recencyScore = Math.max(0, 365 - daysSinceUpdate) / 365;
      const score = r.stargazerCount * 3 + r.forkCount * 2 + recencyScore * 10;
      return { ...r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.url,
      homepage: r.homepageUrl,
      stars: r.stargazerCount,
      forks: r.forkCount,
      language: r.primaryLanguage?.name ?? null,
      languageColor: r.primaryLanguage?.color ?? "#8b949e",
      topics: r.repositoryTopics.nodes.map((n) => n.topic.name).slice(0, 6),
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      sizeKb: r.diskUsage,
      license: r.licenseInfo?.spdxId ?? null,
      commitCount: r.defaultBranchRef?.target.history.totalCount ?? 0,
    }));
}

function computeRepoAnalytics(repos: GQLRepo[]) {
  if (repos.length === 0) return null;
  const active = repos.filter((r) => !r.isArchived);

  const mostStarred = [...active].sort(
    (a, b) => b.stargazerCount - a.stargazerCount,
  )[0];
  const largest = [...repos].sort((a, b) => b.diskUsage - a.diskUsage)[0];
  const mostForked = [...active].sort((a, b) => b.forkCount - a.forkCount)[0];
  const mostRecent = [...repos].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )[0];
  const oldest = [...repos].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )[0];
  const mostCommits = [...repos].sort(
    (a, b) =>
      (b.defaultBranchRef?.target.history.totalCount ?? 0) -
      (a.defaultBranchRef?.target.history.totalCount ?? 0),
  )[0];

  const fmt = (r: GQLRepo) => ({
    name: r.name,
    url: r.url,
    description: r.description,
    language: r.primaryLanguage?.name ?? null,
    languageColor: r.primaryLanguage?.color ?? "#8b949e",
    stars: r.stargazerCount,
    forks: r.forkCount,
    sizeKb: r.diskUsage,
    commitCount: r.defaultBranchRef?.target.history.totalCount ?? 0,
    updatedAt: r.updatedAt,
    createdAt: r.createdAt,
  });

  return {
    mostStarred: fmt(mostStarred),
    largest: fmt(largest),
    mostForked: fmt(mostForked),
    mostRecentlyUpdated: fmt(mostRecent),
    oldest: fmt(oldest),
    mostActive: fmt(mostCommits),
  };
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


function computeAchievements(params: {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  longestStreak: number;
  currentStreak: number;
  totalContributions: number;
  accountAgeYears: number;
  languageCount: number;
}) {
  const {
    publicRepos,
    totalStars,
    totalForks,
    followers,
    totalCommits,
    totalPRs,
    totalIssues,
    longestStreak,
    currentStreak,
    totalContributions,
    accountAgeYears,
    languageCount,
  } = params;

  const b = (
    id: string,
    title: string,
    desc: string,
    icon: string,
    cond: boolean,
    tier: string,
  ) => ({ id, title, description: desc, icon, unlocked: cond, tier });

  return [
    b(
      "repos_10",
      "Builder",
      "Created 10+ repositories",
      "🏗️",
      publicRepos >= 10,
      "bronze",
    ),
    b(
      "repos_25",
      "Prolific Builder",
      "Created 25+ repositories",
      "📦",
      publicRepos >= 25,
      "silver",
    ),
    b(
      "repos_50",
      "Repository Master",
      "Created 50+ repositories",
      "🗄️",
      publicRepos >= 50,
      "gold",
    ),
    b(
      "stars_10",
      "Star Seeker",
      "Earned 10+ stars",
      "⭐",
      totalStars >= 10,
      "bronze",
    ),
    b(
      "stars_50",
      "Star Collector",
      "Earned 50+ stars",
      "🌟",
      totalStars >= 50,
      "silver",
    ),
    b(
      "stars_100",
      "Stellar",
      "Earned 100+ stars",
      "💫",
      totalStars >= 100,
      "gold",
    ),
    b(
      "stars_500",
      "Star Legend",
      "Earned 500+ stars",
      "🌠",
      totalStars >= 500,
      "platinum",
    ),
    b(
      "commits_100",
      "Committer",
      "Made 100+ commits",
      "💾",
      totalCommits >= 100,
      "bronze",
    ),
    b(
      "commits_500",
      "Dedicated Dev",
      "Made 500+ commits",
      "⚡",
      totalCommits >= 500,
      "silver",
    ),
    b(
      "commits_1000",
      "Commit Master",
      "Made 1000+ commits",
      "🏆",
      totalCommits >= 1000,
      "gold",
    ),
    b(
      "commits_5000",
      "Commit Legend",
      "Made 5000+ commits",
      "👑",
      totalCommits >= 5000,
      "platinum",
    ),
    b(
      "prs_10",
      "PR Opener",
      "Opened 10+ pull requests",
      "🔀",
      totalPRs >= 10,
      "bronze",
    ),
    b(
      "prs_50",
      "PR Veteran",
      "Opened 50+ pull requests",
      "🎯",
      totalPRs >= 50,
      "silver",
    ),
    b(
      "issues_20",
      "Issue Tracker",
      "Opened 20+ issues",
      "🐛",
      totalIssues >= 20,
      "bronze",
    ),
    b(
      "followers_10",
      "Influencer",
      "Gained 10+ followers",
      "👥",
      followers >= 10,
      "bronze",
    ),
    b(
      "followers_50",
      "Community Builder",
      "Gained 50+ followers",
      "🤝",
      followers >= 50,
      "silver",
    ),
    b(
      "streak_7",
      "Week Warrior",
      "7-day contribution streak",
      "🔥",
      longestStreak >= 7,
      "bronze",
    ),
    b(
      "streak_30",
      "Monthly Grind",
      "30-day contribution streak",
      "📅",
      longestStreak >= 30,
      "gold",
    ),
    b(
      "streak_active",
      "Currently Active",
      "Has a current streak",
      "⚡",
      currentStreak > 0,
      "bronze",
    ),
    b(
      "contribs_500",
      "Contributor",
      "500+ total contributions",
      "📈",
      totalContributions >= 500,
      "bronze",
    ),
    b(
      "contribs_1000",
      "Super Contributor",
      "1000+ total contributions",
      "🚀",
      totalContributions >= 1000,
      "silver",
    ),
    b(
      "contribs_5000",
      "Contribution Legend",
      "5000+ total contributions",
      "🌋",
      totalContributions >= 5000,
      "gold",
    ),
    b(
      "age_1yr",
      "1-Year Veteran",
      "On GitHub for 1+ year",
      "🎂",
      accountAgeYears >= 1,
      "bronze",
    ),
    b(
      "age_2yr",
      "2-Year Veteran",
      "On GitHub for 2+ years",
      "🎖️",
      accountAgeYears >= 2,
      "silver",
    ),
    b(
      "age_3yr",
      "3-Year Veteran",
      "On GitHub for 3+ years",
      "🏅",
      accountAgeYears >= 3,
      "gold",
    ),
    b(
      "polyglot",
      "Polyglot",
      "Uses 5+ programming languages",
      "🌐",
      languageCount >= 5,
      "silver",
    ),
    b(
      "forks_10",
      "Fork Magnet",
      "Repos forked 10+ times total",
      "🍴",
      totalForks >= 10,
      "bronze",
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

function computeInsights(
  repos: GQLRepo[],
  heatmap: { date: string; count: number; level: number }[],
  stats: {
    totalStars: number;
    totalForks: number;
    totalCommits: number;
    languages: { name: string; percentage: number; repoCount: number }[];
    techStack: { display: string; category: string; count: number }[];
  },
) {
  // Most productive month
  const monthMap: Record<string, number> = {};
  for (const day of heatmap) {
    if (day.count === 0) continue;
    const d = new Date(day.date);
    const key = d.toLocaleString("en-US", { month: "long", year: "numeric" });
    monthMap[key] = (monthMap[key] ?? 0) + day.count;
  }
  const bestMonth = Object.entries(monthMap).sort(([, a], [, b]) => b - a)[0];

  // Most productive year
  const yearMap: Record<string, number> = {};
  for (const day of heatmap) {
    if (day.count === 0) continue;
    const yr = day.date.slice(0, 4);
    yearMap[yr] = (yearMap[yr] ?? 0) + day.count;
  }
  const bestYear = Object.entries(yearMap).sort(([, a], [, b]) => b - a)[0];

  // Average repo size
  const avgSizeKb =
    repos.length > 0
      ? Math.round(repos.reduce((s, r) => s + r.diskUsage, 0) / repos.length)
      : 0;

  // Oldest repo
  const oldestRepo =
    repos.length > 0
      ? [...repos].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )[0]
      : null;

  // Newest repo
  const newestRepo =
    repos.length > 0
      ? [...repos].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0]
      : null;

  // Most maintained (most commits)
  const mostMaintained =
    repos.length > 0
      ? [...repos].sort(
          (a, b) =>
            (b.defaultBranchRef?.target.history.totalCount ?? 0) -
            (a.defaultBranchRef?.target.history.totalCount ?? 0),
        )[0]
      : null;

  // Total code bytes
  const totalBytes = repos.reduce(
    (s, r) => s + r.languages.edges.reduce((ss, e) => ss + e.size, 0),
    0,
  );
  const totalMb = (totalBytes / 1_000_000).toFixed(1);

  const favLang = stats.languages[0];
  const favTech = stats.techStack[0];

  // Active days
  const activeDays = heatmap.filter((d) => d.count > 0).length;

  return [
    {
      label: "Favorite Language",
      value: favLang?.name ?? "—",
      sub: favLang ? `${favLang.percentage}% of code` : "",
      icon: "💻",
    },
    {
      label: "Favorite Technology",
      value: favTech?.display ?? "—",
      sub: favTech ? `${favTech.count} repos` : "",
      icon: "🔧",
    },
    {
      label: "Most Productive Month",
      value: bestMonth ? bestMonth[0] : "—",
      sub: bestMonth ? `${bestMonth[1]} contributions` : "",
      icon: "📆",
    },
    {
      label: "Most Active Year",
      value: bestYear ? bestYear[0] : "—",
      sub: bestYear ? `${bestYear[1]} contributions` : "",
      icon: "🗓️",
    },
    {
      label: "Avg Repository Size",
      value: `${avgSizeKb.toLocaleString()} KB`,
      sub: `across ${repos.length} repos`,
      icon: "📊",
    },
    {
      label: "Total Code Written",
      value: `${totalMb} MB`,
      sub: "across all repositories",
      icon: "📝",
    },
    {
      label: "Most Maintained",
      value: mostMaintained?.name ?? "—",
      sub: mostMaintained
        ? `${mostMaintained.defaultBranchRef?.target.history.totalCount ?? 0} commits`
        : "",
      icon: "🔄",
    },
    {
      label: "Oldest Repository",
      value: oldestRepo?.name ?? "—",
      sub: oldestRepo
        ? new Date(oldestRepo.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })
        : "",
      icon: "🏛️",
    },
    {
      label: "Newest Repository",
      value: newestRepo?.name ?? "—",
      sub: newestRepo
        ? new Date(newestRepo.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })
        : "",
      icon: "🆕",
    },
    {
      label: "Active Coding Days",
      value: `${activeDays} days`,
      sub: "days with contributions (52 weeks)",
      icon: "⚡",
    },
  ];
}

// ── GET handler ───────────────────────────────────────────────────────────────

export async function GET() {
  try {
    // Fetch REST in parallel
    const [userRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: REST_HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
        {
          headers: REST_HEADERS,
          next: { revalidate: 3600 },
        },
      ),
    ]);

    // Fetch GraphQL (requires token)
    let gqlUser: GQLUser | null = null;
    if (GITHUB_TOKEN) {
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
        }
      } catch {
        // GraphQL failed gracefully
      }
    }

    // Parse REST data
    const restUser = userRes.ok ? await userRes.json() : null;
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

    // Tech stack
    const techStack = computeTechStack(repos);

    // Featured repos
    const featuredRepos = computeFeaturedRepos(repos);

    // Repo analytics
    const repoAnalytics = computeRepoAnalytics(repos);

    // Activity timeline — use public events, fall back to repo push timestamps
    const eventsTimeline = computeActivityTimeline(events);
    const activityTimeline =
      eventsTimeline.length >= 5
        ? eventsTimeline
        : [
            ...eventsTimeline,
            ...computeActivityFromRepos(repos, 20).filter(
              (fb) =>
                !eventsTimeline.some((e) => e.repo === fb.repo),
            ),
          ].slice(0, 20);

    // All repos (for explorer) — compact shape
    const allRepos = repos.map((r) => ({
      name: r.name,
      description: r.description,
      url: r.url,
      homepage: r.homepageUrl,
      language: r.primaryLanguage?.name ?? null,
      languageColor: r.primaryLanguage?.color ?? "#8b949e",
      stars: r.stargazerCount,
      forks: r.forkCount,
      topics: r.repositoryTopics.nodes.map((n) => n.topic.name),
      sizeKb: r.diskUsage,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      isArchived: r.isArchived,
      license: r.licenseInfo?.spdxId ?? null,
      commitCount: r.defaultBranchRef?.target.history.totalCount ?? 0,
    }));

    // Total commits across all repos
    const totalCommits = repos.reduce(
      (s, r) => s + (r.defaultBranchRef?.target.history.totalCount ?? 0),
      0,
    );

    // Account age
    const accountAgeYears =
      (Date.now() - new Date(userInfo.createdAt).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000);

    // Achievements
    const achievements = computeAchievements({
      publicRepos: userInfo.publicRepos,
      totalStars,
      totalForks,
      followers: userInfo.followers,
      totalCommits,
      totalPRs,
      totalIssues,
      longestStreak,
      currentStreak,
      totalContributions,
      accountAgeYears,
      languageCount: languages.length,
    });

    // Insights
    const insights = computeInsights(repos, heatmap, {
      totalStars,
      totalForks,
      totalCommits,
      languages,
      techStack,
    });

    return NextResponse.json({
      userInfo,
      stats: {
        totalStars,
        totalForks,
        totalCommitsThisYear,
        totalCommits,
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
      techStack,
      featuredRepos,
      repoAnalytics,
      heatmap,
      activityTimeline,
      allRepos,
      achievements,
      insights,
    });
  } catch (err) {
    console.error("GitHub dashboard error:", err);
    return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
  }
}
