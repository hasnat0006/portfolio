import CodeforcesStats from "@/components/CodeforcesStats";
import GitHubStats from "@/components/GitHubStats";
import HeroSection from "@/components/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";

// ── Projects Data ───────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Tekarsh Website",
    repoName: "Tekarsh_Website",
    description:
      "Job portal where users can learn about the company and apply for positions. Admin panel manages applicants with AI automation that streamlines analysis and reduces recruiter workload.",
    techStack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "TailwindCSS",
      "Supabase",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/hasnat0006/Tekarsh_Website",
    duration: "3 weeks",
  },
  {
    title: "MCC Website",
    repoName: "mcc_website",
    description:
      "Online platform designed to showcase activities and events of the MIST Computer Club. Visitors can explore club information and view upcoming programs.",
    techStack: ["Next.js", "TailwindCSS", "Supabase", "PostgreSQL"],
    githubUrl: "https://github.com/hasnat0006/mcc_website",
    duration: "6 months",
  },
  {
    title: "Career Climb",
    repoName: "Career-Climb",
    description:
      "Platform for CS undergraduates showing roadmaps for specific fields and analyzing skill gaps. Employers can also hire freshers through this platform.",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "TailwindCSS",
      "Supabase",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/hasnat0006/Career-Climb",
    duration: "3 months",
  },
  {
    title: "Autism Compass",
    repoName: "Autism-Compass",
    description:
      "Platform for parents with disordered children to book different types of therapy, consult with specialized doctors, and buy essential toys.",
    techStack: ["React.js", "Node.js", "Express.js", "CSS", "SQL", "Oracle"],
    githubUrl: "https://github.com/hasnat0006/Autism-Compass",
    duration: "3 months",
  },
  {
    title: "RedSet",
    repoName: "RedSet",
    description:
      "Platform for algorithm learners and instructors. Learners explore topic-wise DSA problems while instructors have a smart classroom environment to teach and evaluate students.",
    techStack: ["Java", "JavaFX", "Scene Builder", "Xampp", "MySQL"],
    githubUrl: "https://github.com/hasnat0006/RedSet",
    duration: "3 months",
  },
];

// ── Achievements Data ───────────────────────────────────────────────
const ICPC_ACHIEVEMENTS = [
  {
    place: "77th",
    contest: "ICPC Asia Dhaka Regional Onsite Contest 2025",
    team: "MIST_Untitled",
  },
  {
    place: "114th",
    contest: "ICPC Asia Dhaka Regional Onsite Contest 2024",
    team: "MIST_YaminIsAlive",
  },
];

const IUPC_ACHIEVEMENTS = [
  {
    place: "28th",
    contest: "UIU Inter-University Programming Contest 2025",
    team: "MIST_Volatile",
  },
  {
    place: "28th",
    contest: "MU Inter-University Programming Contest 2025",
    team: "MIST_Untitled",
  },
  {
    place: "30th",
    contest: "AUST Inter-University Programming Contest 2025",
    team: "MIST_273.16_Kelvin",
  },
  {
    place: "42nd",
    contest: "KUET Inter-University Programming Contest 2025",
    team: "MIST_Volatile",
  },
  {
    place: "54th",
    contest: "IUT Inter-University Programming Contest 2024",
    team: "MIST_potato_coders",
  },
  {
    place: "54th",
    contest: "BUET Inter-University Programming Contest 2026",
    team: "MIST_Untitled",
  },
  {
    place: "63rd",
    contest: "BUET Inter-University Programming Contest 2024",
    team: "MIST_YaminIsAlive",
  },
  {
    place: "65th",
    contest: "UU Inter-University Programming Contest 2025",
    team: "MIST_273.16K",
  },
  {
    place: "67th",
    contest: "CUET Inter-University Programming Contest 2025",
    team: "MIST_Untitled",
  },
];

const OTHER_ACHIEVEMENTS = [
  {
    title: "1st Place — Solo Blind Contest (Senior)",
    detail: "MIST Computer Club — Oct 2024",
  },
  {
    title: "1st Runners Up — Inter Army University Programming Contest",
    detail: "Organized by BUP — Sep 2025",
  },
  {
    title: "Champion — Inter MIST Hackathon",
    detail: "MIST Computer Club — Feb 2025",
  },
  {
    title: "First Solver — Problem H",
    detail: "IUT Inter-University Programming Contest 2024 — Apr 2024",
  },
  {
    title: "144th — National Collegiate Programming Contest 2024",
    detail: "Team: MIST_CG0naiCP0nai",
  },
  {
    title: "112th — SUST Inter-University Programming Contest 2024",
    detail: "Team: MIST_Genesis",
  },
  {
    title: "15th — MIST Independence Day Programming Contest 2023",
    detail: "Team: MIST_CG0naiCP0nai",
  },
  { title: "3,557th Globally — Meta Hacker Cup 2023", detail: "" },
  {
    title: "Promising Team — Independence Day Programming Contest 2023",
    detail: "",
  },
];

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
                className="font-mono text-sm"
                style={{ color: "var(--text-accent)" }}
              >
                $
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold font-mono"
                style={{ color: "var(--text-primary)" }}
              >
                ls ./projects
              </h2>
            </div>
            <p
              className="font-mono text-sm ml-6 mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Engineering projects & algorithmic solutions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  githubUrl={project.githubUrl}
                  repoName={project.repoName}
                  duration={project.duration}
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
                className="font-mono text-sm"
                style={{ color: "var(--text-accent)" }}
              >
                $
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold font-mono"
                style={{ color: "var(--text-primary)" }}
              >
                cat ./research
              </h2>
            </div>
            <p
              className="font-mono text-sm ml-6 mb-10"
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
                className="font-mono text-sm"
                style={{ color: "var(--text-accent)" }}
              >
                $
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold font-mono"
                style={{ color: "var(--text-primary)" }}
              >
                cat ./achievements
              </h2>
            </div>
            <p
              className="font-mono text-sm ml-6 mb-10"
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
                    className="text-lg font-bold font-mono"
                    style={{ color: "var(--category-icpc)" }}
                  >
                    ICPC (International Collegiate Programming Contest)
                  </h3>
                </div>
                <div className="space-y-3 ml-1">
                  {ICPC_ACHIEVEMENTS.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="font-mono text-sm mt-0.5"
                        style={{ color: "var(--category-icpc)" }}
                      >
                        ▸
                      </span>
                      <div>
                        <p
                          className="font-mono text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ach.contest}
                        </p>
                        <p
                          style={{ color: "var(--text-secondary)" }}
                          className="text-sm mt-1"
                        >
                          <span
                            className="font-mono font-bold"
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
                    className="text-lg font-bold font-mono"
                    style={{ color: "var(--category-iupc)" }}
                  >
                    IUPC (Inter-University Programming Contest)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-1">
                  {IUPC_ACHIEVEMENTS.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="font-mono text-sm mt-0.5"
                        style={{ color: "var(--category-iupc)" }}
                      >
                        ▸
                      </span>
                      <div>
                        <p
                          className="font-mono text-xs font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {ach.contest}
                        </p>
                        <p
                          style={{ color: "var(--text-secondary)" }}
                          className="text-xs mt-0.5"
                        >
                          <span
                            className="font-mono font-bold"
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
                    className="text-lg font-bold font-mono"
                    style={{ color: "var(--category-other)" }}
                  >
                    Other Achievements
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-1">
                  {OTHER_ACHIEVEMENTS.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="font-mono text-sm mt-0.5"
                        style={{ color: "var(--category-other)" }}
                      >
                        ▸
                      </span>
                      <div>
                        <p
                          className="font-mono text-xs font-semibold"
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
                    className="text-lg font-bold font-mono"
                    style={{ color: "var(--text-accent)" }}
                  >
                    Academic Record
                  </h3>
                </div>
                <div className="space-y-3 ml-1">
                  <div className="flex items-start gap-3">
                    <span
                      className="font-mono text-sm mt-0.5"
                      style={{ color: "var(--text-accent)" }}
                    >
                      ▸
                    </span>
                    <div>
                      <p
                        className="font-mono text-sm font-semibold"
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
                      className="font-mono text-sm mt-0.5"
                      style={{ color: "var(--text-accent)" }}
                    >
                      ▸
                    </span>
                    <div>
                      <p
                        className="font-mono text-sm font-semibold"
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
                            className="text-xs font-mono"
                            style={{ color: "var(--text-muted)" }}
                          >
                            CGPA
                          </p>
                          <p
                            className="text-xl font-bold font-mono"
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
                            className="text-xs font-mono"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Spring GPA
                          </p>
                          <p
                            className="text-xl font-bold font-mono"
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
                className="font-mono text-sm"
                style={{ color: "var(--text-accent)" }}
              >
                $
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold font-mono"
                style={{ color: "var(--text-primary)" }}
              >
                curl api.github.com/users/hasnat0006
              </h2>
            </div>
            <p
              className="font-mono text-sm ml-6 mb-10"
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
                className="font-mono text-sm"
                style={{ color: "var(--text-accent)" }}
              >
                $
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold font-mono"
                style={{ color: "var(--text-primary)" }}
              >
                curl codeforces.com/api/Hasnat0006
              </h2>
            </div>
            <p
              className="font-mono text-sm ml-6 mb-10"
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
          className="max-w-4xl mx-auto text-center font-mono text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <p>
            <span style={{ color: "var(--text-accent)" }}>$</span> echo
            &quot;Built with Next.js, Tailwind CSS &amp; Sanity CMS&quot;
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
