/**
 * Returns an emoji icon based on the achievement title.
 */
export function getIcon(title: string): string {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes("champion") ||
    (normalizedTitle.includes("1st") && !normalizedTitle.includes("runners"))
  ) {
    return "\u{1F3C6}";
  }
  if (
    normalizedTitle.includes("runners") ||
    normalizedTitle.includes("runner")
  ) {
    return "\u{1F948}";
  }
  if (
    normalizedTitle.includes("first solver") ||
    normalizedTitle.includes("solver")
  ) {
    return "\u26A1";
  }
  if (
    normalizedTitle.includes("globally") ||
    normalizedTitle.includes("hacker cup")
  ) {
    return "\u{1F310}";
  }
  if (normalizedTitle.includes("promising")) {
    return "\u2B50";
  }
  if (normalizedTitle.includes("dean")) {
    return "\u{1F4D6}";
  }
  return "\u{1F3AF}";
}

/**
 * Extracts a 4-digit year from a string (e.g., contest name).
 */
export function extractYear(name: string): string {
  return name.match(/\d{4}/)?.[0] ?? "";
}

/**
 * Calculates the percentile rank given a rank and total participants.
 */
export function percentile(rank: number, total: number): number {
  return Math.round(((total - rank) / total) * 100);
}

/**
 * Determines the CSS color variable for a rank value.
 */
export function getRankColor(rank: number): string {
  if (rank <= 50) return "var(--text-accent)";
  if (rank <= 80) return "var(--text-primary)";
  return "var(--text-secondary)";
}

/**
 * Extracts the prefix character from a string-numeric value like "#77".
 */
export function extractPrefix(value: string): string {
  return value.replace(/[0-9]/g, "")[0] ?? "";
}

/**
 * Extracts the numeric portion from a string.
 */
export function extractNumericValue(value: string): number {
  return parseInt(value.replace(/\D/g, ""), 10) || 0;
}
