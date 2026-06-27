import CodeforcesStats from "@/components/CodeforcesStats";
import GitHubStats from "@/components/GitHubStats";
import HeroSection from "@/components/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";
import {
  ICPC_ACHIEVEMENTS,
  IUPC_ACHIEVEMENTS,
  OTHER_ACHIEVEMENTS,
} from "@/data/achievements";
import { PROJECTS } from "@/data/projects";

// â”€â”€ Projects Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="flex-1">
        {/* ── Hero Section ───────────────────────────────────────── */}
        <HeroSection />

        {/* ── Projects Section ───────────────────────────────────── */}
        <section id="projects" className="px-4 py-16 md:py-24">
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
              Engineering projects & algorithmic solutions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.short_description}
                  techStack={project.techStack}
                  githubUrl={project.githubUrl}
                  duration={project.duration}
                  photoUrl={project.photoUrl}
                  liveUrl={project.liveUrl}
                  collaborators={project.collaborators}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Research Section ────────────────────────────────────── */}
        <section id="research" className="px-4 py-16 md:py-24">
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
                cat ./research
              </h2>
            </div>
            <p
              className="text-code text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Peer-reviewed scientific contributions
            </p>

            <PublicationCard
              title="Biomedical Computational Data Pipelines"
              description="Co-authored peer-reviewed scientific paper indexed in PubMed, focusing on computational data pipelines for biomedical research. The work involves large-scale data processing, statistical analysis, and pipeline optimization for clinical research workflows."
              indexedIn="PubMed"
              domain="Biomedical / Computational Data Pipelines"
            />
          </div>
        </section>

        {/* ── Achievements Section ───────────────────────────────── */}
        <section id="achievements" className="px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
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
              className="text-code text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Competitive programming & academic milestones
            </p>

            <div className="space-y-6">
              {/* ── ICPC Achievements ── */}
              <div
                className="rounded-xl border p-6 transition-all duration-300"
                style={{
                  borderColor: "var(--category-icpc-border)",
                  background: "var(--category-icpc-bg)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🌍</span>
                  <h3
                    className="text-subheading text-lg"
                    style={{ color: "var(--category-icpc)" }}
                  >
                    ICPC (International Collegiate Programming Contest)
                  </h3>
                </div>
                <div className="space-y-3 ml-1">
                  {ICPC_ACHIEVEMENTS.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="text-code text-sm mt-0.5"
                        style={{ color: "var(--category-icpc)" }}
                      >
                        ▸
                      </span>
                      <div>
                        <p
                          className="text-small text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ach.contest}
                        </p>
                        <p
                          style={{ color: "var(--text-secondary)" }}
                          className="text-sm mt-1"
                        >
                          <span
                            className="text-code font-bold"
                            style={{ color: "var(--category-icpc)" }}
                          >
                            {ach.place}
                          </span>
                          {" — "}Team: {ach.team}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── IUPC Achievements ── */}
              <div
                className="rounded-xl border p-6 transition-all duration-300"
                style={{
                  borderColor: "var(--category-iupc-border)",
                  background: "var(--category-iupc-bg)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🏅</span>
                  <h3
                    className="text-subheading text-lg"
                    style={{ color: "var(--category-iupc)" }}
                  >
                    IUPC (Inter-University Programming Contest)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-1">
                  {IUPC_ACHIEVEMENTS.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="text-code text-sm mt-0.5"
                        style={{ color: "var(--category-iupc)" }}
                      >
                        ▸
                      </span>
                      <div>
                        <p
                          className="text-small text-xs font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ach.contest}
                        </p>
                        <p
                          style={{ color: "var(--text-secondary)" }}
                          className="text-xs mt-0.5"
                        >
                          <span
                            className="text-code font-bold"
                            style={{ color: "var(--category-iupc)" }}
                          >
                            {ach.place}
                          </span>
                          {" — "}
                          {ach.team}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Other Achievements ── */}
              <div
                className="rounded-xl border p-6 transition-all duration-300"
                style={{
                  borderColor: "var(--category-other-border)",
                  background: "var(--category-other-bg)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🎯</span>
                  <h3
                    className="text-subheading text-lg"
                    style={{ color: "var(--category-other)" }}
                  >
                    Other Achievements
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-1">
                  {OTHER_ACHIEVEMENTS.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="text-code text-sm mt-0.5"
                        style={{ color: "var(--category-other)" }}
                      >
                        ▸
                      </span>
                      <div>
                        <p
                          className="text-small text-xs font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ach.title}
                        </p>
                        {ach.detail && (
                          <p
                            style={{ color: "var(--text-secondary)" }}
                            className="text-xs mt-0.5"
                          >
                            {ach.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Academic Record ── */}
              <div
                className="rounded-xl border p-6 transition-all duration-300"
                style={{
                  borderColor: "var(--border-accent)",
                  background: "var(--bg-card)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🎓</span>
                  <h3
                    className="text-subheading text-lg"
                    style={{ color: "var(--text-accent)" }}
                  >
                    Academic Record
                  </h3>
                </div>
                <div className="space-y-3 ml-1">
                  <div className="flex items-start gap-3">
                    <span
                      className="text-code text-sm mt-0.5"
                      style={{ color: "var(--text-accent)" }}
                    >
                      ▸
                    </span>
                    <div>
                      <p
                        className="text-small text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Military Institute of Science and Technology (MIST)
                      </p>
                      <p
                        className="text-sm mt-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        B.Sc. in Computer Science & Engineering (Expected
                        Graduation: June 2026)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="text-code text-sm mt-0.5"
                      style={{ color: "var(--text-accent)" }}
                    >
                      ▸
                    </span>
                    <div>
                      <p
                        className="text-small text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Academic Performance
                      </p>
                      <div className="flex gap-4 mt-2">
                        <div
                          className="px-4 py-2.5 rounded-lg border"
                          style={{
                            background: "var(--bg-badge)",
                            borderColor: "var(--border-accent)",
                          }}
                        >
                          <p
                            className="text-meta"
                            style={{ color: "var(--text-muted)" }}
                          >
                            CGPA
                          </p>
                          <p
                            className="text-xl font-bold text-code"
                            style={{ color: "var(--text-accent)" }}
                          >
                            3.69
                          </p>
                        </div>
                        <div
                          className="px-4 py-2.5 rounded-lg border"
                          style={{
                            background: "var(--bg-badge)",
                            borderColor: "var(--border-accent)",
                          }}
                        >
                          <p
                            className="text-meta"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Spring GPA
                          </p>
                          <p
                            className="text-xl font-bold text-code"
                            style={{ color: "var(--text-accent)" }}
                          >
                            3.71
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GitHub Stats Section ─────────────────────────────────── */}
        <section
          id="github"
          className="px-4 py-16 md:py-24"
          style={{ background: "var(--bg-secondary)" }}
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
              Live GitHub analytics & repository statistics
            </p>
            <GitHubStats />
          </div>
        </section>

        {/* ── Codeforces Stats Section ─────────────────────────────── */}
        <section id="codeforces" className="px-4 py-16 md:py-24">
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
              Competitive programming rating & problem-solving stats
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
          <p className="text-code text-sm">
            <span style={{ color: "var(--text-accent)" }}>$</span> echo
            &quot;Built with Next.js &amp; Tailwind CSS&quot;
          </p>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Yusuf Reza Hasnat. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
