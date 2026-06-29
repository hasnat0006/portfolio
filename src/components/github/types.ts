// ─────────────────────────────────────────────────────────────────────────────
// GitHub Dashboard — TypeScript Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface GitHubUserInfo {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  company: string | null;
  location: string | null;
  websiteUrl: string | null;
  createdAt: string;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  profileViews: number;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalCommitsThisYear: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalCodeReviews: number;
  totalContributions: number;
  totalContributedRepos: number;
  currentStreak: number;
  longestStreak: number;
  isCurrentlyActive: boolean;
}

export interface LanguageStat {
  name: string;
  color: string;
  bytes: number;
  repoCount: number;
  percentage: number;
}

export interface TechItem {
  display: string;
  category: string;
  count: number;
}

export interface FeaturedRepo {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  sizeKb: number;
  license: string | null;
  commitCount: number;
}

export interface RepoAnalyticsItem {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  languageColor: string;
  stars: number;
  forks: number;
  sizeKb: number;
  commitCount: number;
  updatedAt: string;
  createdAt: string;
}

export interface RepoAnalytics {
  mostStarred: RepoAnalyticsItem;
  largest: RepoAnalyticsItem;
  mostForked: RepoAnalyticsItem;
  mostRecentlyUpdated: RepoAnalyticsItem;
  oldest: RepoAnalyticsItem;
  mostActive: RepoAnalyticsItem;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface TimelineItem {
  type: string;
  repo: string;
  repoUrl: string;
  description: string;
  date: string;
  icon: string;
  url: string | null;
  message?: string | null;
}

export interface RepoItem {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  languageColor: string;
  stars: number;
  forks: number;
  topics: string[];
  sizeKb: number;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  license: string | null;
  commitCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

export interface Insight {
  label: string;
  value: string;
  sub?: string;
  icon: string;
}

export interface GitHubApiResponse {
  userInfo: GitHubUserInfo;
  stats: GitHubStats;
  languages: LanguageStat[];
  techStack: TechItem[];
  featuredRepos: FeaturedRepo[];
  repoAnalytics: RepoAnalytics | null;
  heatmap: HeatmapDay[];
  activityTimeline: TimelineItem[];
  allRepos: RepoItem[];
  achievements: Achievement[];
  insights: Insight[];
}

// ── Category colors for tech stack ───────────────────────────────────────────
export const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#3b82f6",
  Backend: "#10b981",
  Database: "#f59e0b",
  Language: "#8b5cf6",
  DevOps: "#ef4444",
  "AI/ML": "#06b6d4",
  CS: "#ec4899",
  Blockchain: "#f97316",
  Cloud: "#64748b",
  API: "#84cc16",
  Security: "#a78bfa",
};
