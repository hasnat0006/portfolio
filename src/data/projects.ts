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
    title: "Tekarsh Website",
    short_description:
      "Job portal where users can learn about the company and apply for positions. Admin panel manages applicants with AI automation that streamlines analysis and reduces recruiter workload.",
    full_description:
      "Tekarsh Website is a comprehensive job portal designed to connect job seekers with employers. The platform offers a user-friendly interface for browsing job listings, submitting applications, and managing profiles. Additionally, it features an admin panel that leverages AI automation to streamline the application review process and reduce the workload on recruiters.",
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
    title: "MCC Website",
    short_description:
      "Online platform designed to showcase activities and events of the MIST Computer Club. Visitors can explore club information and view upcoming programs.",
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
    title: "MCC Discord Bot",
    short_description:
      "Discord bot for MIST Computer Club that automates tasks, manages events, and enhances member engagement with interactive features.",
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
    title: "Career Climb",
    short_description:
      "Platform for CS undergraduates showing roadmaps for specific fields and analyzing skill gaps. Employers can also hire freshers through this platform.",
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
    title: "Autism Compass",
    short_description:
      "Platform for parents with disordered children to book different types of therapy, consult with specialized doctors, and buy essential toys.",
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
      "Platform for algorithm learners and instructors. Learners explore topic-wise DSA problems while instructors have a smart classroom environment to teach and evaluate students.",
    full_description:
      "RedSet is a platform designed for algorithm learners and instructors. It provides a comprehensive set of DSA problems organized by topics, allowing learners to practice and improve their skills. Instructors can utilize the platform to create engaging classroom experiences and evaluate student performance.",
    techStack: ["Java", "JavaFX", "Scene Builder", "Xampp", "MySQL"],
    githubUrl: "https://github.com/hasnat0006/RedSet",
    duration: "3 months",
    collaborators: [{ name: "Hasnat Hasan", github: "hasnat0006" }],
  },
];
