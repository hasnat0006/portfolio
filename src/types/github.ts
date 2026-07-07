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
