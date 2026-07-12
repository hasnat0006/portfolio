import { Footer } from "@/components/layout/Footer";
import NavigationBar from "@/components/layout/NavigationBar";
import HeroSection from "@/features/hero/HeroSection";
import ProjectsSection from "@/features/projects/ProjectsSection";
import SkillsSection from "@/features/skills/SkillsSection";
import dynamic from "next/dynamic";

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
const GitHubActivity = dynamic(
  () => import("@/features/github/activity/GitHubActivitySection"),
);

export default function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="flex-1">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ExperienceSection />
        <section
          id="github"
          className="px-4 py-16 md:py-24"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-heading text-2xl md:text-3xl mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              GitHub
            </h2>
            <p
              className="text-body text-sm mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Open Source &amp; Development Analytics
            </p>

            {/* Grid: stacked on mobile, 60/40 columns on lg+ */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">
              {/* Left column: Hero + Contribution Heatmap */}
              <div className="min-w-0">
                <GitHubStats />
              </div>

              {/* Right column: Activity feed */}
              <div className="min-w-0">
                <GitHubActivity compact />
              </div>
            </div>
          </div>
        </section>

        <section
          id="codeforces"
          className="px-4 py-16 md:py-24"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-heading text-2xl md:text-3xl mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Competitive Programming
            </h2>
            <p
              className="text-body text-sm mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Solving algorithmic problems, participating in contests, and
              continuously improving through competitive programming.
            </p>
            <CodeforcesStats />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
