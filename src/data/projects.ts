export interface Collaborator {
  name: string;
  github: string;
}

export interface Project {
  title: string;
  short_description: string;
  full_description: string;
  techStack: string[];
  githubUrl: string;
  duration: string;
  slug?: string;
  liveUrl?: string;
  photoUrl?: string[];
  collaborators?: Collaborator[];
  /** The problem or motivation that sparked the project. */
  problem?: string;
  /** How the project was built — approach, architecture, key decisions. */
  solution?: string;
  /** Specific obstacles encountered during development. */
  challenges?: string[];
  /** The broader impact or outcome of the project. */
  impact?: string;
  /** Quantifiable results (e.g. [{ label: "Users", value: "500+" }]). */
  metrics?: { label: string; value: string }[];
  /** High-level architecture description or diagram label. */
  architecture?: string;
  /** Your role on the project (e.g. "Solo Developer", "Frontend Lead"). */
  role?: string;
  /** Whether this project should appear in the featured spotlight section. */
  featured?: boolean;
}

/**
 * Derive a URL-friendly slug from a project title.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get a project by its slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug || slugify(p.title) === slug);
}

/**
 * Get all project slugs for static generation.
 */
export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug ?? slugify(p.title));
}

export const PROJECTS: Project[] = [
  {
    title: "MCC Website",
    short_description:
      "MIST Computer Club's official website designed to showcase activities, events, upcoming contest announcements, MIST performances in various National and International programming competitions and most importantly managing the club activities.",
    full_description:
      "The MCC Website is an online platform designed to showcase the activities and events of the MIST Computer Club. It provides a space for members to share information, collaborate on projects, and stay updated on the latest happenings within the club.",
    techStack: ["Next.js", "TailwindCSS", "Supabase", "PostgreSQL", "Bun"],
    githubUrl: "https://github.com/istiaqueahmedarik/mcc_website",
    duration: "1.5 years",
    liveUrl: "https://computerclub.mist.ac.bd",
    photoUrl: [
      "projects/mcc_website/mcc_website_1.png",
      "projects/mcc_website/mcc_website_2.png",
      "projects/mcc_website/mcc_website_3.png",
      "projects/mcc_website/mcc_website_4.png",
      "projects/mcc_website/mcc_website_5.png",
    ],
    collaborators: [
      { name: "Istiaque Ahmed Arik", github: "istiaqueahmedarik" },
      { name: "Md. Saif Ahmed", github: "Saif-Sakib" },
      { name: "Syed Tamal", github: "Tamal267" },
      { name: "Ragib Hossain", github: "Ragib100" },
      { name: "Mantaka Mahir", github: "MantakaMahir" },
      { name: "Ismail Hossain", github: "ismailone23" },
    ],
    role: "Frontend Lead & Core Developer",
    featured: true,
    problem:
      "MIST Computer Club lacked a centralized digital presence — event info, contest announcements, and club resources were scattered across WhatsApp groups and social media, making it hard for members to stay informed.",
    solution:
      "Built a full-featured club portal with a public-facing showcase and a private admin dashboard. The frontend uses Next.js App Router for SSR and ISR, ensuring fast loads for contest standings and event pages. Supabase handles auth, file storage, and the PostgreSQL backend.",
    challenges: [
      "Coordinating across a 6-person team with varying availability and skill levels.",
      "Designing a role-based access system for executive committee members to manage content.",
      "Optimizing image-heavy pages (event galleries, member photos) without sacrificing Lighthouse scores.",
    ],
    impact:
      "Became the official digital hub for the club, used daily by 200+ members and the executive committee to publish announcements, manage contests, and showcase MIST's achievements in national competitions.",
    metrics: [
      { label: "Monthly Active Users", value: "200+" },
      { label: "Pages", value: "15+" },
      { label: "Team Size", value: "6" },
    ],
  },
  {
    title: "Career Climb",
    short_description:
      "Platform for CS undergraduates showing roadmaps for specific fields and analyzing skill gaps. Employers can also hire freshers through this platform by posting job openings and connecting with potential candidates. Also provides a self-assessment tool for students to evaluate their skills and identify areas for improvement.",
    full_description:
      "Career Climb is a platform designed for Computer Science undergraduates to explore career paths and identify skill gaps. It provides interactive roadmaps for various fields and offers tools for self-assessment. Employers can also utilize the platform to connect with fresh graduates.",
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
    liveUrl: "https://climb-career.vercel.app/",
    photoUrl: [
      "projects/career_climb/1.png",
      "projects/career_climb/2.png",
      "projects/career_climb/3.png",
      "projects/career_climb/4.png",
      "projects/career_climb/5.png",
      "projects/career_climb/6.png",
    ],
    collaborators: [
      { name: "Tanvin Sarkar Pallob", github: "Tanvin2442002" },
      { name: "Zaima Ahmed", github: "zaaaiiimaaa" },
      { name: "Nazifa Zahin Ifrit", github: "ifwiit27" },
      { name: "Nabiha Parvez", github: "nabiha45" },
    ],
    role: "Tech Lead & Full-Stack Developer",
    featured: false,
    problem:
      "CS students at MIST lacked clear career roadmaps and a way to assess their skill gaps. At the same time, employers found it difficult to discover fresh talent from the university.",
    solution:
      "Built a dual-purpose platform: students get interactive roadmaps and self-assessment quizzes, employers can post jobs and browse candidate profiles. The frontend uses React with Tailwind, while Supabase handles auth, storage, and relational data.",
    challenges: [
      "Designing an accurate skill-gap analysis algorithm that maps user inputs to real-world job requirements.",
      "Balancing the feature set for two distinct user personas (student vs. employer) without cluttering the UI.",
    ],
    impact:
      "Successfully delivered as a capstone project, demonstrating a practical solution to the university-to-industry transition gap. Used by 50+ students during the pilot.",
    metrics: [
      { label: "Students Onboarded", value: "50+" },
      { label: "Job Listings", value: "20+" },
      { label: "Team Size", value: "5" },
    ],
  },

  {
    title: "MCC Discord Bot",
    short_description:
      "This bot is forked from TLE Bot and customized for MIST Computer Club's Discord server. It automates various programming contest-related tasks like sending contest reminders, fetching contest standings and showcase achievements to engage members and tracking their progress.",
    full_description:
      "The MCC Discord Bot is a custom-built bot designed to enhance the functionality of the MIST Computer Club's Discord server. It automates various tasks, manages events, and provides interactive features to engage members and streamline communication within the community.",
    techStack: ["Python"],
    githubUrl: "https://github.com/hasnat0006/TLE",
    duration: "3 months",
    photoUrl: [
      "projects/discord_bot/1.png",
      "projects/discord_bot/2.png",
      "projects/discord_bot/3.png",
    ],
    liveUrl: "https://discord.gg/FQDBBrmkAT",
    role: "Solo Developer",
    featured: false,
    problem:
      "The MIST Computer Club Discord server needed automated programming contest reminders and standings tracking to keep members engaged, but existing bots were either too generic or lacked Codeforces/AtCoder support.",
    solution:
      "Forked the popular TLE bot and customized it for MCC. Added automatic contest reminders, real-time standings fetching, and achievement role assignment based on contest performance. All configured via slash commands.",
    challenges: [
      "Understanding the existing TLE codebase and its plugin architecture.",
      "Dealing with rate limits from Codeforces API during high-traffic contest periods.",
      "Configuring the role-based reward system to trigger reliably after contest completion.",
    ],
    impact:
      "Club engagement on Discord increased significantly — contest participation reminders reached 100+ members automatically, and the standings feature sparked healthy competition.",
    metrics: [
      { label: "Discord Members", value: "150+" },
      { label: "Contests Tracked", value: "30+" },
      { label: "Uptime", value: "99%" },
    ],
  },
  {
    title: "Tekarsh Website",
    short_description:
      "Tekarsh Website is a company's official website designed to showcase their services and provide a platform for job seekers to explore opportunities. The platform offers a user-friendly interface for browsing job listings, submitting applications and managing profiles using AI-powered tools.",
    full_description:
      "Tekarsh Website is a job portal designed to connect job seekers with employers. The platform offers a user-friendly interface for browsing job listings, submitting applications, and managing profiles. Additionally, it features an admin panel that leverages AI automation to streamline the application review process and reduce the workload on recruiters.",
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
    liveUrl: "https://tekarsh-website.vercel.app/",
    photoUrl: [
      "projects/tekarsh/tekarsh_1.png",
      "projects/tekarsh/tekarsh_2.png",
    ],
    role: "Solo Developer (Intern Project)",
    featured: false,
    problem:
      "Tekarsh needed a modern web presence to showcase their staffing and recruitment services, along with an AI-powered admin panel to streamline the resume screening process.",
    solution:
      "Developed a complete company website using Next.js with a Supabase backend. The public-facing side presents services and job listings, while the admin panel uses basic NLP heuristics to rank and filter candidate resumes, reducing manual screening effort.",
    challenges: [
      "Delivering a production-ready product within a 3-week internship timeline.",
      "Integrating AI-powered resume parsing with limited NLP resources.",
      "Setting up a clean role-based auth system for admin vs. public users.",
    ],
    impact:
      "The website went live as the company's primary digital presence, and the AI screening feature reduced initial resume filtering time significantly during the pilot.",
    metrics: [
      { label: "Dev Time", value: "3 weeks" },
      { label: "Job Listings Live", value: "10+" },
    ],
  },
  {
    title: "Autism Compass",
    short_description:
      "Autism Compass is a platform designed to support parents of children with autism spectrum disorder. It allows users to book various types of therapy sessions, consult with specialized doctors and purchase essential toys for their children.",
    full_description:
      "Autism Compass is a platform designed to support parents of children with autism spectrum disorder. It allows users to book various types of therapy sessions, consult with specialized doctors, and purchase essential toys for their children.",
    techStack: ["React.js", "Node.js", "Express.js", "CSS", "SQL", "Oracle"],
    githubUrl: "https://github.com/hasnat0006/Autism-Compass",
    duration: "3 months",
    liveUrl: "https://autism-compass.vercel.app/",
    photoUrl: ["projects/autism_compass/1.png"],
    collaborators: [
      { name: "Tanvin Sarkar Pallob", github: "Tanvin2442002" },
      { name: "Nazifa Zahin Ifrit", github: "ifwiit27" },
      { name: "Mehnaj Hridi", github: "mehnaj-hridi" },
    ],
    role: "Full-Stack Developer",
    featured: true,
    problem:
      "Parents of children with autism in Bangladesh face difficulty finding and booking therapy sessions, consulting specialists, and accessing appropriate resources — all of which are currently managed through informal channels.",
    solution:
      "Built a centralized platform with three core modules: therapy session bookings (speech, occupational, behavioral), specialist doctor consultations via scheduled calls, and a curated shop for therapeutic toys. The React frontend communicates with an Express API connected to an Oracle database.",
    challenges: [
      "Designing a booking system that handles scheduling conflicts and multiple therapy types.",
      "Working with Oracle for the first time — steep learning curve compared to PostgreSQL.",
      "Creating an intuitive UI for users who may not be tech-savvy (parents of young children).",
    ],
    impact:
      "Presented as a solution for improving autism care accessibility in Bangladesh. The platform demonstrated how technology can bridge the gap between specialists and families.",
    metrics: [
      { label: "Therapy Types", value: "3" },
      { label: "Team Size", value: "4" },
    ],
  },
  {
    title: "RedSet",
    short_description:
      "RedSet is a platform designed for algorithm learners and instructors. It provides a comprehensive set of DSA problems organized by topics, allowing learners to practice and improve their skills. Instructors can utilize the platform to create engaging classroom experiences and evaluate student performance.",
    full_description:
      "RedSet is a platform designed for algorithm learners and instructors. It provides a comprehensive set of DSA problems organized by topics, allowing learners to practice and improve their skills. Instructors can utilize the platform to create engaging classroom experiences and evaluate student performance.",
    techStack: ["Java", "JavaFX", "Scene Builder", "Xampp", "MySQL"],
    githubUrl: "https://github.com/hasnat0006/RedSet",
    duration: "3 months",
    collaborators: [
      { name: "Tanvin Sarkar Pallob", github: "Tanvin2442002" },
      { name: "Syed Tamal", github: "Tamal267" },
    ],
    photoUrl: ["projects/redset/1.png"],
    role: "Backend & Database Developer",
    featured: false,
    problem:
      "There was no dedicated platform for MIST students to practice DSA problems categorized by topic, and instructors lacked tools to create coding assignments and evaluate submissions efficiently.",
    solution:
      "Developed a JavaFX desktop application with a MySQL backend. Problems are organized by data structure/algorithm topics, and instructors can create custom problem sets for their classes. The desktop interface provides a distraction-free coding environment.",
    challenges: [
      "Building a responsive JavaFX UI that feels modern — JavaFX's default components required heavy customization.",
      "Designing the MySQL schema to support hierarchical topic groupings and class-based problem assignments.",
      "Handling concurrency when multiple students submit solutions simultaneously.",
    ],
    impact:
      "Used by MIST students for DSA practice alongside their coursework. The class-based assignment feature made it easy for instructors to integrate it into their teaching.",
    metrics: [
      { label: "Problems Available", value: "100+" },
      { label: "Topics Covered", value: "15+" },
      { label: "Team Size", value: "3" },
    ],
  },
  {
    title: "MindOra",
    short_description:
      "MindOra is a mental health mobile platform that combines AI-powered insights, professional therapist integration and comprehensive wellness tracking to support users on their mental health journey. The application features a Flutter-based mobile client and a robust Node.js backend with Supabase integration.",
    full_description:
      "MindOra is a mental health support platform designed to provide users with accessible resources, a supportive community, and professional guidance for their mental wellness journey.",
    techStack: [
      "Flutter",
      "Dart",
      "Node.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/hasnat0006/MindOra",
    duration: "3 months",
    photoUrl: ["projects/mindora/1.png"],
    collaborators: [
      { name: "Zaima Ahmed", github: "zaaaiiimaaa" },
      { name: "Nazifa Zahin Ifrit", github: "ifwiit27" },
      { name: "Nabiha Parvez", github: "nabiha45" },
    ],
    role: "Backend Developer & Tech Lead",
    featured: true,
    problem:
      "Mental health resources in Bangladesh are fragmented — there's no integrated platform that combines AI-driven self-assessment, professional therapist access, and wellness tracking in one place.",
    solution:
      "Architected a cross-platform mobile app with Flutter frontend and Node.js/Express backend on Supabase. The AI module provides mood pattern analysis and personalized recommendations, while the therapist integration allows booking and secure messaging. Designed a scalable PostgreSQL schema for user data, therapy sessions, and wellness logs.",
    challenges: [
      "Designing a HIPAA-aware data model for sensitive mental health information, even though the project is educational.",
      "Integrating real-time chat between users and therapists using WebSockets.",
      "Balancing feature richness with mobile performance on lower-end devices.",
    ],
    impact:
      "A comprehensive mental health platform that demonstrates how AI and teletherapy can be combined to make mental health support more accessible in Bangladesh.",
    metrics: [
      { label: "Platforms", value: "iOS + Android" },
      { label: "Modules", value: "4" },
      { label: "Team Size", value: "4" },
    ],
  },
];
