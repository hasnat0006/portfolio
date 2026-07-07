/**
 * Terminal-style section header for the Achievements section.
 */
export function AchievementHeader() {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-code text-sm"
          style={{ color: "var(--text-accent)" }}
        >
          $
        </span>
        <h2
          className="text-heading text-2xl md:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          cat ./achievements
        </h2>
      </div>
      <p
        className="text-code text-sm ml-6 mb-12"
        style={{ color: "var(--text-muted)" }}
      >
        Competitive programming &amp; other milestones
      </p>
    </>
  );
}
