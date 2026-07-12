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

export interface GHHeatmapDay {
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

export interface GitHubApiResponse {
  userInfo: GitHubUserInfo;
  stats: GitHubStats;
  languages: LanguageStat[];
  heatmap: GHHeatmapDay[];
  activityTimeline: TimelineItem[];
}

// ── GitHub Events API types ───────────────────────────────────────────────

/** Raw event from the GitHub Events API. */
export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: Record<string, unknown>;
  public: boolean;
  created_at: string;
}

/** Parsed, human-readable activity item for the timeline UI. */
export interface ActivityItem {
  /** Unique event ID from GitHub. */
  id: string;
  /** Normalized event type key (push, pr, issue, release, etc.). */
  type: ActivityType;
  /** Human-readable action description. */
  title: string;
  /** Full repository name (e.g. "hasnat0006/portfolio"). */
  repo: string;
  /** GitHub URL for the repository. */
  repoUrl: string;
  /** Direct link to the specific event/action when available. */
  url: string | null;
  /** ISO-8601 timestamp. */
  date: string;
  /** Commit count (for push events). */
  commitCount?: number;
  /** Up to 3 commit messages (for push events). */
  commitMessages?: string[];
  /** Whether additional commits exist beyond the shown ones. */
  hasMoreCommits?: boolean;
  /** Whether the repo is also featured in the Projects section. */
  isProject?: boolean;
}

export type ActivityType =
  | "push"
  | "pr"
  | "pr_review"
  | "issue"
  | "issue_comment"
  | "create"
  | "delete"
  | "release"
  | "fork"
  | "star"
  | "public"
  | "commit_comment"
  | "wiki"
  | "unknown";

export type ActivityFilter =
  | "all"
  | "commits"
  | "prs"
  | "releases"
  | "stars"
  | "forks"
  | "issues";

/** Response from the /api/github/activity endpoint. */
export interface GitHubActivityResponse {
  events: ActivityItem[];
  /** Number of events returned. */
  count: number;
  /** Whether there are more pages available. */
  hasMore: boolean;
  /** ISO timestamp of when the data was fetched. */
  fetchedAt: string;
  /** Error message if something went wrong. */
  error?: string;
}
