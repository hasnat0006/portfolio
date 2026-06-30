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
  liveUrl?: string;
  photoUrl?: string[];
  collaborators?: Collaborator[];
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
  },
];
