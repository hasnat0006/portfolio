export interface CFUserInfo {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar: string;
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
}

export interface CFHeatmapDay {
  date: string;
  accepted: number;
  total: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface CFContestRow {
  contestId: number;
  contestName: string;
  date: string;
  rank: number;
  oldRating: number;
  newRating: number;
  delta: number;
  problemsSolved: number;
}

export interface CFInsight {
  label: string;
  value: string;
  sub?: string;
  icon: string;
}

export interface DashboardStats {
  solved: { count: number };
  totalSubmissions: number;
  acceptanceRate: number;
  heatmap: CFHeatmapDay[];
  contests: CFContestRow[];
  currentStreak: number;
  longestStreak: number;
  averageSolvedRating: number;
  hardestSolved: CFProblem | null;
  insights: CFInsight[];
  isCurrentlyActive: boolean;
}

export interface CFApiResponse {
  userInfo: CFUserInfo;
  ratingHistory: CFRatingEntry[];
  stats: DashboardStats;
}

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
