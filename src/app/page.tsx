import NavigationBar from "@/components/NavigationBar";
import { Footer } from "@/components/layout/Footer";
import HeroSection from "@/features/hero/HeroSection";
import ProjectsSection from "@/features/projects/ProjectsSection";
import SkillsSection from "@/features/skills/SkillsSection";
import dynamic from "next/dynamic";

// Lazy-load below-fold sections — code-split to reduce initial bundle
const AchievementsSection = dynamic(
  () => import("@/features/achievements/AchievementsSection"),
);
const ExperienceSection = dynamic(
  () => import("@/features/experience/ExperienceSection"),
);
const GitHubStats = dynamic(() => import("@/features/github/GitHubStats"));
const CodeforcesStats = dynamic(
  () => import("@/features/codeforces/CodeforcesStats"),
);

export default function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="flex-1">
        {/* ── Hero Section ───────────────────────────────────────── */}
        <HeroSection />

        {/* ── Skills Section ──────────────────────────────────────── */}
        <SkillsSection />

        {/* ── Projects Section ───────────────────────────────────── */}
        <ProjectsSection />

        {/* ── Achievements Section ───────────────────────────────── */}
        <AchievementsSection />

        {/* ── Experience Section ────────────────────────────────── */}
        <ExperienceSection />

        {/* ── GitHub Stats Section ─────────────────────────────────── */}
        <section
          id="github"
          className="px-4 py-16 md:py-24"
          style={{ background: "var(--bg-secondary)", scrollMarginTop: "5rem" }}
        >
          <div className="max-w-6xl mx-auto">
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
                curl github.com/hasnat0006
              </h2>
            </div>
            <p
              className="text-code text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Open Source &amp; Development Analytics
            </p>
            <GitHubStats />
          </div>
        </section>

        {/* ── Codeforces Stats Section ─────────────────────────────── */}
        <section
          id="codeforces"
          className="px-4 py-16 md:py-24"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="max-w-6xl mx-auto">
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
                Competitive Programming
              </h2>
            </div>
            <p
              className="text-code text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Solving algorithmic problems, participating in contests, and
              continuously improving through competitive programming.
            </p>
            <CodeforcesStats />
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
