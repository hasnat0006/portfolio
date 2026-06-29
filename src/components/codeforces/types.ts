// ─────────────────────────────────────────────────────────────────────────────
// ── Codeforces API Raw Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CFUserInfo {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar: string;
  titlePhoto: string;
  organization: string;
  contribution: number;
  friendOfCount: number;
  registrationTimeSeconds: number;
}

export interface CFRatingEntry {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface CFProblem {
  contestId?: number;
  index: string;
  name: string;
  rating?: number;
  tags: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Computed Statistics Shapes (pre-computed server-side)
// ─────────────────────────────────────────────────────────────────────────────

export interface TopicStat {
  topic: string;
  count: number;
  percentage: number;
}

export interface RatingBucket {
  rating: number;
  count: number;
  percentage: number;
}

export interface LanguageStat {
  language: string;
  displayName: string;
  total: number;
  accepted: number;
  acceptanceRate: number;
}

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  accepted: number;
  total: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContestRow {
  contestId: number;
  contestName: string;
  date: string;
  rank: number;
  oldRating: number;
  newRating: number;
  delta: number;
  problemsSolved: number;
  totalParticipants?: number;
}

export interface RecentProblem {
  id: number;
  contestId?: number;
  problemIndex: string;
  problemName: string;
  problemRating?: number;
  tags: string[];
  language: string;
  verdict: string;
  submittedAt: string;
  url: string;
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

export interface DashboardStats {
  solved: { count: number };
  totalSubmissions: number;
  acceptanceRate: number;
  topics: TopicStat[];
  ratingDistribution: RatingBucket[];
  languages: LanguageStat[];
  heatmap: HeatmapDay[];
  contests: ContestRow[];
  recentProblems: RecentProblem[];
  currentStreak: number;
  longestStreak: number;
  averageSolvedRating: number;
  hardestSolved: CFProblem | null;
  averageContestRatingChange: number;
  achievements: Achievement[];
  insights: Insight[];
  isCurrentlyActive: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// ── API Response (pre-computed server-side)
// ─────────────────────────────────────────────────────────────────────────────

export interface CFApiResponse {
  userInfo: CFUserInfo;
  ratingHistory: CFRatingEntry[];
  stats: DashboardStats;
}

// ─────────────────────────────────────────────────────────────────────────────
// ── Rank helpers
// ─────────────────────────────────────────────────────────────────────────────

export const RANK_COLORS: Record<string, string> = {
  unrated: "#808080",
  newbie: "#808080",
  pupil: "#008000",
  specialist: "#03a89e",
  expert: "#0000ff",
  "candidate master": "#aa00aa",
  master: "#ff8c00",
  "international master": "#ff8c00",
  grandmaster: "#ff0000",
  "international grandmaster": "#ff0000",
  "legendary grandmaster": "#ff0000",
};

export function getRankColor(rank: string): string {
  return RANK_COLORS[rank.toLowerCase()] ?? "#808080";
}
