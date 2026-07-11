export interface Collaborator {
  name: string;
  github: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  image?: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  category:
    | "performance"
    | "seo"
    | "accessibility"
    | "responsiveness"
    | "architecture"
    | "design";
}

export interface LessonItem {
  title: string;
  description: string;
}

export interface ArchitectureStep {
  title: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  description: string;
}

export interface TechStackCategory {
  category: string;
  items: TechStackItem[];
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
  /** Current project status. */
  status?: "Live" | "In Development" | "Completed" | "Archived";
  /** Feature showcase items for the detail page. */
  features?: FeatureItem[];
  /** Technical implementation highlights. */
  technicalHighlights?: HighlightItem[];
  /** Lessons learned from the project. */
  lessons?: LessonItem[];
  /** Architecture/development process steps. */
  architectureSteps?: ArchitectureStep[];
  /** Categorized tech stack with descriptions. */
  techStackDetails?: TechStackCategory[];
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
      "The MCC Website is the official digital hub of the MIST Computer Club, serving over 200 active members with event management, contest tracking, and club administration.\n\nBuilt with Next.js and Supabase, the platform combines a public-facing showcase of club activities with a private admin dashboard for the executive committee. The public side features event listings, contest announcements with real-time standings, a member directory, and a gallery of achievements from national and international programming competitions.\n\nThe admin portal provides role-based access control for content publishing, event creation, member management, and analytics. Supabase handles authentication, file storage, and the PostgreSQL backend, while Next.js ISR ensures fast page loads for dynamic contest data.\n\nWith a 6-person team working across frontend, backend, and design, the project required careful coordination and a shared component library to maintain consistency across all pages.",
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
    architecture:
      "The system follows a hybrid rendering model — public pages use ISR for optimal performance while authenticated admin routes run as client components. Supabase Row Level Security enforces role-based access at the database level, and the component library ensures design consistency across modules developed by different team members.",
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
    status: "Live",
    features: [
      {
        title: "Event Management",
        description:
          "Comprehensive event management system for creating, publishing, and promoting club events with RSVP tracking and calendar integration.",
      },
      {
        title: "Contest Dashboard",
        description:
          "Real-time contest standings and performance tracking for national and international programming competitions with historical data.",
      },
      {
        title: "Admin Portal",
        description:
          "Role-based admin dashboard for executive committee members to manage content, approve posts, and oversee club operations.",
      },
      {
        title: "Member Directory",
        description:
          "Centralized directory of club members with profiles, roles, and contact information for better community engagement.",
      },
    ],
    technicalHighlights: [
      {
        title: "Performance",
        description:
          "Leveraged Next.js SSR and ISR to deliver fast page loads for contest standings and event pages, achieving high Lighthouse scores despite image-heavy content.",
        category: "performance",
      },
      {
        title: "Responsive Design",
        description:
          "Fluid layout and adaptive components ensure the site works seamlessly across devices, from desktop monitors to mobile phones.",
        category: "responsiveness",
      },
      {
        title: "Component Architecture",
        description:
          "Modular component system with reusable UI primitives, enabling rapid feature development across a 6-person team.",
        category: "architecture",
      },
      {
        title: "Accessibility",
        description:
          "Semantic HTML, ARIA labels, and keyboard-navigable interfaces ensure the platform is usable by all members.",
        category: "accessibility",
      },
    ],
    lessons: [
      {
        title: "Team Coordination",
        description:
          "Working with a 6-person team taught me the importance of clear communication, component contracts, and regular sync-ups to avoid integration conflicts.",
      },
      {
        title: "Role-Based Design",
        description:
          "Designing an RBAC system from scratch gave me deep insight into permission models, middleware patterns, and secure API design.",
      },
      {
        title: "Performance Budgeting",
        description:
          "Image-heavy pages forced me to think critically about lazy loading, format optimization, and CDN strategies to maintain Lighthouse scores.",
      },
    ],
    architectureSteps: [
      {
        title: "Requirements Gathering",
        description:
          "Conducted interviews with club executives to identify pain points — scattered announcements, manual contest tracking, and lack of member engagement analytics.",
      },
      {
        title: "Tech Stack Selection",
        description:
          "Chose Next.js for SSR/ISR capabilities, Supabase for managed PostgreSQL and auth, and TailwindCSS for rapid UI development across the team.",
      },
      {
        title: "Component Library",
        description:
          "Built a shared component library with design tokens to ensure visual consistency across all pages, even with multiple developers working in parallel.",
      },
      {
        title: "API & Auth Integration",
        description:
          "Designed the Supabase schema for events, contests, and member data, with Row Level Security policies for role-based access control.",
      },
      {
        title: "Testing & Deployment",
        description:
          "Set up CI/CD with Vercel preview deployments for QA review, then production deployment with ISR caching for optimal performance.",
      },
    ],
  },
  {
    title: "Career Climb",
    short_description:
      "Platform for CS undergraduates showing roadmaps for specific fields and analyzing skill gaps. Employers can also hire freshers through this platform by posting job openings and connecting with potential candidates. Also provides a self-assessment tool for students to evaluate their skills and identify areas for improvement.",
    full_description:
      "Career Climb is a dual-purpose platform built for MIST Computer Science undergraduates to bridge the gap between academic learning and industry expectations. It serves both students exploring career paths and employers seeking fresh talent.\n\nFor students, the platform offers interactive roadmaps for various CS fields — from software engineering to data science — with curated milestones, learning resources, and skill recommendations. A self-assessment quiz module evaluates proficiency across key areas and generates a personalized skill gap analysis, highlighting areas that need improvement before entering the job market.\n\nFor employers, Career Climb provides a dedicated dashboard to post job openings, browse student profiles filtered by skills and assessment scores, and connect directly with promising candidates. This dual-interface approach required careful UX design to balance the needs of two distinct user personas within a single platform.\n\nBuilt with React, Node.js, Express, and Supabase, the platform was developed as a capstone project by a team of 5 over 3 months, following agile methodology with regular stakeholder feedback.",
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
    architecture:
      "A dual-interface architecture with separate onboarding flows for students and employers sharing a common backend. The frontend uses React with a component-based architecture for reusability across the two personas, while Supabase provides authentication, file storage, and a PostgreSQL database with Row Level Security.",
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
    status: "Live",
    features: [
      {
        title: "Interactive Roadmaps",
        description:
          "Visual career roadmaps for various CS fields, guiding students through the skills and milestones needed for their chosen path.",
      },
      {
        title: "Skill Gap Analysis",
        description:
          "Self-assessment quizzes that evaluate student skills against real-world job requirements and identify areas for improvement.",
      },
      {
        title: "Employer Dashboard",
        description:
          "Dedicated portal for employers to post job openings, browse candidate profiles, and connect with fresh graduates.",
      },
      {
        title: "Dual User Experience",
        description:
          "Tailored interfaces for both students and employers, balancing feature richness with clarity for each distinct user persona.",
      },
    ],
    technicalHighlights: [
      {
        title: "Scalable Architecture",
        description:
          "Modular React frontend with a Node.js/Express API layer, designed to handle growth in both student and employer user bases.",
        category: "architecture",
      },
      {
        title: "Responsive Design",
        description:
          "Mobile-first responsive layout ensuring students can access roadmaps and assessments on any device.",
        category: "responsiveness",
      },
      {
        title: "Performance",
        description:
          "Optimized database queries and React component memoization to keep the skill-gap analysis results snappy.",
        category: "performance",
      },
    ],
    lessons: [
      {
        title: "Dual Persona Design",
        description:
          "Balancing features for students and employers in one platform taught me to prioritize core user flows and avoid feature bloat.",
      },
      {
        title: "Algorithm Design",
        description:
          "Building the skill-gap analysis engine required creative thinking about matching user inputs to real-world job requirements.",
      },
      {
        title: "Team Leadership",
        description:
          "Leading a 5-person team through a capstone project reinforced my project management and code review skills.",
      },
    ],
    architectureSteps: [
      {
        title: "User Research",
        description:
          "Surveyed CS students and potential employers to understand the gap between academic skills and industry requirements.",
      },
      {
        title: "Platform Design",
        description:
          "Designed a dual-interface system with separate onboarding flows for students and employers, sharing a common backend.",
      },
      {
        title: "Backend Development",
        description:
          "Built RESTful APIs with Express.js, Supabase for authentication and storage, and PostgreSQL for relational data.",
      },
      {
        title: "Frontend Implementation",
        description:
          "Developed the React frontend with reusable components, interactive roadmaps, and a responsive assessment quiz system.",
      },
      {
        title: "Testing & Launch",
        description:
          "Conducted user testing with 20+ students, iterated on feedback, and deployed to production on Vercel.",
      },
    ],
  },

  {
    title: "MCC Discord Bot",
    short_description:
      "This bot is forked from TLE Bot and customized for MIST Computer Club's Discord server. It automates various programming contest-related tasks like sending contest reminders, fetching contest standings and showcase achievements to engage members and tracking their progress.",
    full_description:
      "The MCC Discord Bot is a customized fork of the popular TLE bot, tailored specifically for the MIST Computer Club's Discord community of 150+ members. It automates programming contest-related tasks to keep members engaged and informed.\n\nThe bot monitors Codeforces and AtCoder contest schedules, automatically sending reminder messages to designated Discord channels before each event. After contests conclude, it fetches real-time standings and displays top performers with their rating changes, sparking friendly competition within the community.\n\nA key feature is the automated role-based reward system — members earn rank-based roles based on their contest performance, creating a gamified incentive structure that boosts participation. All features are accessible through intuitive slash commands, making the bot easy to use without memorizing complex syntax.\n\nDeployed on a cloud server with Docker, the bot maintains 99% uptime through robust error handling, automatic reconnection, and rate-limit-aware API calls. The project demonstrated how open-source customization can quickly deliver value to a specific community.",
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
    architecture:
      "Built as an extension on top of the TLE bot's plugin architecture, with event-driven modules for contest monitoring, standings retrieval, and role assignment. Uses asynchronous task scheduling with rate-limit-aware API calls to Codeforces and AtCoder, with automatic recovery on failure.",
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
    status: "Live",
    features: [
      {
        title: "Contest Reminders",
        description:
          "Automatic contest reminders for Codeforces and AtCoder events, sent to Discord channels before each competition starts.",
      },
      {
        title: "Real-Time Standings",
        description:
          "Live standings fetching after contest completion, displaying top performers and rating changes directly in Discord.",
      },
      {
        title: "Achievement Roles",
        description:
          "Automated role assignment based on contest performance, rewarding members with rank-based roles for motivation.",
      },
      {
        title: "Slash Command Interface",
        description:
          "Full slash command support for all bot features, making it easy for members to interact without memorizing syntax.",
      },
    ],
    technicalHighlights: [
      {
        title: "Reliability",
        description:
          "Achieved 99% uptime through robust error handling, automatic reconnection, and rate-limit-aware API calls to Codeforces.",
        category: "architecture",
      },
      {
        title: "Performance",
        description:
          "Optimized API calls with caching and batch processing to handle contest periods with high traffic without hitting rate limits.",
        category: "performance",
      },
    ],
    lessons: [
      {
        title: "Codebase Understanding",
        description:
          "Forking and customizing an existing codebase taught me to read and understand foreign code architecture before making changes.",
      },
      {
        title: "API Rate Limiting",
        description:
          "Working with Codeforces API under rate limits taught me to implement exponential backoff and request queuing effectively.",
      },
      {
        title: "Event-Driven Design",
        description:
          "Building reliable role assignment on contest completion required careful event handling and state management across async operations.",
      },
    ],
    architectureSteps: [
      {
        title: "Codebase Analysis",
        description:
          "Studied the TLE bot's plugin architecture to understand how to add MCC-specific features without breaking existing functionality.",
      },
      {
        title: "Feature Customization",
        description:
          "Added MCC-specific contest tracking, custom reminder schedules, and role-based reward system on top of the existing plugin system.",
      },
      {
        title: "Testing & Deployment",
        description:
          "Deployed the bot to a cloud server with Docker, set up monitoring, and tested during live contest periods for reliability.",
      },
    ],
  },
  {
    title: "Tekarsh Website",
    short_description:
      "Tekarsh Website is a company's official website designed to showcase their services and provide a platform for job seekers to explore opportunities. The platform offers a user-friendly interface for browsing job listings, submitting applications and managing profiles using AI-powered tools.",
    full_description:
      "Tekarsh Website is a full-featured recruitment and staffing platform developed as an intern project for Tekarsh, a growing recruitment company. The platform serves both as the company's primary digital presence and as a functional job portal with AI-powered resume screening.\n\nThe public-facing side presents the company's staffing services, company culture, client testimonials, and a dynamic job board where candidates can search, filter, and apply for positions. The interface is built with Next.js for optimal performance and SEO, ensuring the company ranks well for recruitment-related searches.\n\nBehind the scenes, an admin panel equipped with NLP-based resume parsing technology automatically ranks and filters incoming applications. Recruiters can quickly identify top candidates without manually screening every submission — a feature that significantly reduced initial filtering time during the pilot phase.\n\nDelivery within a tight 3-week timeline required focused sprint planning and ruthless prioritization. Role-based authentication cleanly separates public users, job applicants, and admin users, each with appropriate permissions and interfaces.",
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
    architecture:
      "Next.js App Router powers both the public-facing pages and the admin dashboard with role-based routing. Supabase manages authentication, file storage, and the PostgreSQL database. The NLP screening module runs as serverless functions for scalable processing.",
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
    status: "Live",
    features: [
      {
        title: "Company Showcase",
        description:
          "Modern company website presenting staffing services, company culture, and client testimonials in a clean, professional layout.",
      },
      {
        title: "Job Listings Portal",
        description:
          "Dynamic job board with search and filter capabilities, allowing candidates to find relevant positions quickly.",
      },
      {
        title: "AI Resume Screening",
        description:
          "NLP-powered admin panel that ranks and filters candidate resumes, significantly reducing manual screening effort for recruiters.",
      },
      {
        title: "Role-Based Access",
        description:
          "Clean authentication system distinguishing between public users, job applicants, and admin users with appropriate permissions.",
      },
    ],
    technicalHighlights: [
      {
        title: "Rapid Development",
        description:
          "Delivered a production-ready company website with AI features within a 3-week internship timeline through focused sprint planning.",
        category: "architecture",
      },
      {
        title: "Performance",
        description:
          "Next.js SSR and ISR ensured fast page loads and excellent SEO for the company's public-facing pages.",
        category: "performance",
      },
      {
        title: "Responsive Design",
        description:
          "Fully responsive layout that presents the company's services effectively across all devices and screen sizes.",
        category: "responsiveness",
      },
    ],
    lessons: [
      {
        title: "Time Management",
        description:
          "Delivering a production app in 3 weeks taught me to prioritize ruthlessly, focus on core features, and avoid perfectionism.",
      },
      {
        title: "Practical AI",
        description:
          "Implementing NLP-based resume screening with limited resources showed me that practical AI doesn't need to be cutting-edge to be useful.",
      },
      {
        title: "Client Communication",
        description:
          "Working with a real client on an internship project improved my ability to translate business requirements into technical specifications.",
      },
    ],
    architectureSteps: [
      {
        title: "Requirements Analysis",
        description:
          "Met with company stakeholders to define core features: company showcase, job listings, and AI-powered resume screening.",
      },
      {
        title: "Rapid Prototyping",
        description:
          "Built a functional prototype within the first week using Next.js and Supabase, getting early feedback from the client.",
      },
      {
        title: "AI Integration",
        description:
          "Implemented NLP heuristics for resume parsing and ranking, integrating it into the admin panel workflow.",
      },
      {
        title: "Deployment & Handover",
        description:
          "Deployed to Vercel production, set up custom domain, and documented the admin panel for the company team.",
      },
    ],
  },
  {
    title: "Autism Compass",
    short_description:
      "Autism Compass is a platform designed to support parents of children with autism spectrum disorder. It allows users to book various types of therapy sessions, consult with specialized doctors and purchase essential toys for their children.",
    full_description:
      "Autism Compass is a comprehensive platform designed to support parents of children with autism spectrum disorder in Bangladesh, where specialized resources and therapy services are often fragmented and difficult to access through formal channels.\n\nThe platform integrates three core modules into a unified experience. The therapy booking system allows parents to schedule speech, occupational, and behavioral therapy sessions with qualified professionals, handling scheduling conflicts and availability through an intelligent calendar system. The doctor consultation module enables parents to connect with specialist doctors via scheduled calls, bringing expert advice directly to families who may not have easy access to specialists in their area.\n\nAdditionally, a curated e-commerce section offers therapeutic toys and educational resources that support child development, all vetted for appropriateness. The interface is designed with accessibility as a priority — large touch targets, clear contrast, simple navigation flows, and forgiving error handling ensure that parents of all technical backgrounds can use the platform comfortably.\n\nDeveloped over 3 months using React with an Express.js backend and Oracle database, the project was presented as an academic demonstration of how technology can improve autism care accessibility in underserved communities.",
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
    architecture:
      "Three-module architecture (therapy booking, consultations, shop) sharing a common user database and authentication layer. The React frontend communicates with an Express.js REST API, with Oracle handling complex relational data for scheduling, appointments, and inventory.",
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
    status: "Completed",
    features: [
      {
        title: "Therapy Booking",
        description:
          "Comprehensive booking system for speech, occupational, and behavioral therapy sessions with scheduling conflict prevention.",
      },
      {
        title: "Doctor Consultations",
        description:
          "Platform for scheduling and conducting specialist doctor consultations via scheduled calls, bridging the gap between families and specialists.",
      },
      {
        title: "Therapeutic Toy Shop",
        description:
          "Curated e-commerce section for therapeutic toys and resources, making essential tools accessible to families.",
      },
      {
        title: "Accessible Interface",
        description:
          "Intuitive, user-friendly interface designed for parents who may not be tech-savvy, with clear navigation and simple workflows.",
      },
    ],
    technicalHighlights: [
      {
        title: "Booking Algorithm",
        description:
          "Designed a scheduling system that handles multiple therapy types, conflict detection, and calendar management efficiently.",
        category: "architecture",
      },
      {
        title: "Database Design",
        description:
          "Structured the Oracle database schema to support complex relationships between users, therapists, appointments, and payments.",
        category: "architecture",
      },
      {
        title: "Accessibility",
        description:
          "Prioritized large touch targets, clear contrast, and simple navigation flows for users who may have limited technical experience.",
        category: "accessibility",
      },
    ],
    lessons: [
      {
        title: "New Technology Adoption",
        description:
          "Learning Oracle on the fly taught me to quickly adapt to new database systems and understand their unique features and quirks.",
      },
      {
        title: "User-Centered Design",
        description:
          "Designing for non-tech-savvy parents reinforced the importance of simplicity, clear labels, and forgiving error handling.",
      },
      {
        title: "Social Impact",
        description:
          "Building a platform for autism care made me realize how technology can directly improve quality of life for underserved communities.",
      },
    ],
    architectureSteps: [
      {
        title: "Domain Research",
        description:
          "Researched autism care resources in Bangladesh to understand the gap between available services and family needs.",
      },
      {
        title: "System Design",
        description:
          "Designed a three-module architecture: therapy booking, doctor consultations, and toy shop, all sharing a common user database.",
      },
      {
        title: "Backend Development",
        description:
          "Built Express.js APIs connected to Oracle database, handling complex scheduling logic and user management.",
      },
      {
        title: "Frontend Development",
        description:
          "Developed the React frontend with a focus on accessibility and ease of use for parents of different technical backgrounds.",
      },
      {
        title: "Presentation",
        description:
          "Prepared the platform for academic presentation, demonstrating its potential impact on autism care accessibility in Bangladesh.",
      },
    ],
  },
  {
    title: "RedSet",
    short_description:
      "RedSet is a platform designed for algorithm learners and instructors. It provides a comprehensive set of DSA problems organized by topics, allowing learners to practice and improve their skills. Instructors can utilize the platform to create engaging classroom experiences and evaluate student performance.",
    full_description:
      "RedSet is a desktop application built to address the lack of structured DSA practice platforms available to MIST students. While online judges like LeetCode and Codeforces exist, RedSet focuses on topic-organized learning that aligns with the university's curriculum.\n\nThe application features a repository of over 100 DSA problems organized by data structures and algorithm topics — arrays, linked lists, trees, graphs, dynamic programming, and more. Each problem includes difficulty ratings, topic tags, and sample test cases. Students can filter and search problems to focus on specific areas they need to improve.\n\nFor instructors, RedSet provides class management tools that allow creating custom problem sets, assigning them to specific classes, and tracking student submission status and performance. This bridges the gap between classroom teaching and hands-on practice.\n\nBuilt with JavaFX for the desktop interface and MySQL for the backend, the application presented unique challenges compared to web development. Customizing JavaFX components to achieve a modern look required creative CSS-like styling, and designing a hierarchical MySQL schema to support topic groupings and class-based assignments demanded careful planning.",
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
    architecture:
      "JavaFX desktop client with a layered architecture — presentation layer (Scene Builder layouts), business logic layer (problem management, assignment engine), and data access layer (MySQL via JDBC). The MySQL schema supports hierarchical topic groupings, class-based assignments, and concurrent submission tracking.",
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
    status: "Completed",
    features: [
      {
        title: "Problem Repository",
        description:
          "Comprehensive collection of 100+ DSA problems organized by topics, difficulty levels, and data structures for structured learning.",
      },
      {
        title: "Topic-Based Organization",
        description:
          "Problems categorized by data structure and algorithm topics, allowing learners to focus on specific areas of study.",
      },
      {
        title: "Class Management",
        description:
          "Instructor tools for creating custom problem sets, assignments, and tracking student performance across classes.",
      },
      {
        title: "Desktop Coding Environment",
        description:
          "Distraction-free JavaFX desktop interface optimized for focused problem-solving and algorithm practice.",
      },
    ],
    technicalHighlights: [
      {
        title: "Desktop UI Polish",
        description:
          "Heavily customized JavaFX components to create a modern, responsive UI that goes beyond the default Java look and feel.",
        category: "design",
      },
      {
        title: "Database Schema",
        description:
          "Designed a hierarchical MySQL schema supporting topic groupings, class-based assignments, and student submission tracking.",
        category: "architecture",
      },
      {
        title: "Concurrency Handling",
        description:
          "Implemented proper database transaction management to handle concurrent submissions from multiple students without data corruption.",
        category: "architecture",
      },
    ],
    lessons: [
      {
        title: "Desktop Development",
        description:
          "Building a JavaFX app taught me the unique challenges of desktop UI development compared to web platforms.",
      },
      {
        title: "Schema Design",
        description:
          "Designing hierarchical topic groupings and class-based permissions deepened my understanding of relational database design.",
      },
      {
        title: "Educational Tools",
        description:
          "Creating a platform for both students and instructors showed me how educational tools need to serve two distinct user needs.",
      },
    ],
    architectureSteps: [
      {
        title: "Requirements Definition",
        description:
          "Gathered requirements from MIST students and instructors to define the problem repository structure and class management features.",
      },
      {
        title: "Database Design",
        description:
          "Designed the MySQL schema with tables for problems, topics, users, classes, assignments, and submissions with proper relationships.",
      },
      {
        title: "JavaFX Development",
        description:
          "Built the desktop interface using Scene Builder for layouts and customized JavaFX components for a polished look.",
      },
      {
        title: "Integration & Testing",
        description:
          "Connected the JavaFX frontend to the MySQL backend, tested with sample problem sets, and refined based on user feedback.",
      },
    ],
  },
  {
    title: "MindOra",
    short_description:
      "MindOra is a mental health mobile platform that combines AI-powered insights, professional therapist integration and comprehensive wellness tracking to support users on their mental health journey. The application features a Flutter-based mobile client and a robust Node.js backend with Supabase integration.",
    full_description:
      "MindOra is a comprehensive mental health support platform designed to make wellness resources accessible to users across Bangladesh. The platform combines AI-driven insights, professional therapist integration, and holistic wellness tracking in a single cross-platform mobile application.\n\nThe AI module analyzes user mood patterns through daily check-ins and journal entries, identifying trends and providing personalized recommendations for activities, exercises, and coping strategies. Over time, the system learns individual patterns and adapts its suggestions accordingly.\n\nA therapist directory allows users to find licensed mental health professionals, book sessions, and communicate through secure real-time messaging powered by WebSockets. This integration bridges the gap between self-guided wellness and professional support, making therapy more accessible.\n\nWellness tracking features include mood logging, sleep pattern analysis, activity tracking, and meditation reminders — all presented through intuitive visualizations that help users understand their mental health journey.\n\nBuilt with Flutter for cross-platform performance on both iOS and Android, with a Node.js/Express backend and Supabase PostgreSQL database, MindOra demonstrates how modern mobile technology can make mental health support more accessible, especially in regions where such resources are limited.",
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
    architecture:
      "Flutter cross-platform frontend communicating with a Node.js/Express REST API hosted on Supabase. The PostgreSQL schema is designed with Row Level Security for HIPAA-aware data privacy. WebSocket connections power real-time therapist messaging, while the AI module uses on-device processing for mood pattern analysis.",
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
    status: "Completed",
    features: [
      {
        title: "AI Mood Analysis",
        description:
          "Machine learning-powered mood pattern analysis that provides personalized recommendations based on user's emotional trends.",
      },
      {
        title: "Therapist Integration",
        description:
          "Secure platform for finding, booking, and messaging licensed therapists, with real-time chat and scheduled session management.",
      },
      {
        title: "Wellness Tracking",
        description:
          "Comprehensive wellness tracking including mood logs, sleep patterns, and activity metrics with visual trend analysis.",
      },
      {
        title: "Cross-Platform Mobile",
        description:
          "Flutter-based mobile app delivering a consistent experience on both iOS and Android with native performance.",
      },
    ],
    technicalHighlights: [
      {
        title: "Cross-Platform Architecture",
        description:
          "Flutter frontend with a shared Dart codebase delivers native performance on both iOS and Android from a single codebase.",
        category: "architecture",
      },
      {
        title: "Data Privacy",
        description:
          "Designed a HIPAA-aware data model with encryption and strict access controls for sensitive mental health information.",
        category: "architecture",
      },
      {
        title: "Real-Time Communication",
        description:
          "Integrated WebSocket-based real-time messaging between users and therapists for secure, instant communication.",
        category: "performance",
      },
      {
        title: "Scalable Backend",
        description:
          "Node.js/Express backend on Supabase with PostgreSQL, designed to scale as the user base grows across modules.",
        category: "architecture",
      },
    ],
    lessons: [
      {
        title: "Privacy by Design",
        description:
          "Handling sensitive mental health data taught me to think deeply about data privacy, encryption, and access control from day one.",
      },
      {
        title: "Real-Time Architecture",
        description:
          "Integrating WebSocket-based chat into a Flutter app gave me practical experience with real-time communication patterns.",
      },
      {
        title: "Mobile Performance",
        description:
          "Balancing feature richness with performance on lower-end Android devices taught me to profile and optimize critical rendering paths.",
      },
    ],
    architectureSteps: [
      {
        title: "Concept Research",
        description:
          "Researched existing mental health platforms and identified the gap for an integrated AI + therapist approach in Bangladesh.",
      },
      {
        title: "System Architecture",
        description:
          "Designed a multi-module architecture with Flutter frontend, Node.js/Express API, and Supabase PostgreSQL backend.",
      },
      {
        title: "Database & Auth",
        description:
          "Created a scalable PostgreSQL schema for user data, therapy sessions, wellness logs, and secure authentication with Row Level Security.",
      },
      {
        title: "Real-Time Features",
        description:
          "Implemented WebSocket-based chat system for therapist-patient messaging with end-to-end encryption considerations.",
      },
      {
        title: "Testing & Refinement",
        description:
          "Tested on multiple Android and iOS devices, optimized performance, and prepared the platform for academic presentation.",
      },
    ],
  },
];
