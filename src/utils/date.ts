/**
 * Converts a Unix timestamp (in seconds) to an ISO date string (YYYY-MM-DD).
 */
export function toDateString(seconds: number): string {
  return new Date(seconds * 1000).toISOString().split("T")[0];
}

/**
 * Formats a date string or timestamp into a readable contest date format.
 */
export function formatContestDate(timestampSeconds: number): string {
  return new Date(timestampSeconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
