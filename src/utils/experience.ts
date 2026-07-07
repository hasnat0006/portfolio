/**
 * Checks whether a timeline entry is current (present/ongoing).
 */
export function isCurrentEntry(endDate: string): boolean {
  return (
    endDate.toLowerCase().includes("present") ||
    endDate.toLowerCase().includes("ongoing")
  );
}
