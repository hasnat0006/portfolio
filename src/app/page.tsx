import AchievementsSection from "@/components/AchievementsSection";
import CodeforcesStats from "@/components/CodeforcesStats";
import ExperienceSection from "@/components/ExperienceSection";
import GitHubStats from "@/components/GitHubStats";
import HeroSection from "@/components/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="flex-1">
        {/* ── Hero Section ───────────────────────────────────────── */}
        <HeroSection />

        {/* ── Projects Section ───────────────────────────────────── */}
        <section
          id="projects"
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
                ls ./projects
              </h2>
            </div>
            <p
              className="text-code text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Engineering projects &amp; algorithmic solutions
            </p>

            <div className="columns-1 md:columns-2 gap-6 space-y-0">
              {PROJECTS.map((project) => (
                <div key={project.title} className="break-inside-avoid mb-6">
                  <ProjectCard
                    title={project.title}
                    description={project.short_description}
                    techStack={project.techStack}
                    githubUrl={project.githubUrl}
                    duration={project.duration}
                    photoUrl={project.photoUrl}
                    liveUrl={project.liveUrl}
                    collaborators={project.collaborators}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

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
          <div className="max-w-4xl mx-auto">
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
                curl api.github.com/users/hasnat0006
              </h2>
            </div>
            <p
              className="text-code text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Live GitHub analytics &amp; repository statistics
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
          <div className="max-w-4xl mx-auto">
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
                curl codeforces.com/api/Hasnat0006
              </h2>
            </div>
            <p
              className="text-code text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Competitive programming rating &amp; problem-solving stats
            </p>
            <CodeforcesStats />
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        className="px-4 py-8"
        style={{ borderTop: "1px solid var(--border-primary)" }}
      >
        <div
          className="max-w-4xl mx-auto text-center"
          style={{ color: "var(--text-muted)" }}
        >
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Yusuf Reza Hasnat. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
