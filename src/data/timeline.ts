export interface Education {
  name_of_institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  cgpa?: string;
  institution_logo?: string;
  institution_website?: string;
  institution_location?: string;
  /** Key coursework relevant to software engineering. */
  coursework?: string[];
  /** Extracurricular and leadership activities. */
  activities?: { name: string; role: string; period: string }[];
  /** Professional certifications obtained during this period. */
  certifications?: { title: string; issuer: string; url?: string }[];
  /** Notable academic or personal achievements. */
  notableAchievements?: string[];
}

interface Role {
  name: string;
  start_date: string;
  end_date?: string;
}

export interface WorkExperience {
  company_name: string;
  role: Role[];
  responsibilities: string[];
  company_logo?: string;
  company_website?: string;
  company_location?: string;
  is_currently_working?: boolean;
  description?: string;
  /** Technologies/tools used day-to-day in this role. */
  technologies?: string[];
  /** Specific accomplishments with measurable impact. */
  achievements?: string[];
  /** Quantifiable metrics for this role. */
  metrics?: { label: string; value: string }[];
}

export interface VolunteerExperience {
  organization_name: string;
  role: Role[];
  responsibilities: string[];
  organization_logo?: string;
  organization_website?: string;
  organization_location?: string;
  description?: string;
}

export const education: Education[] = [
  {
    name_of_institution: "Military Institute of Science and Technology",
    degree: "Bachelor of Science and Engineering",
    field_of_study: "Computer Science and Engineering",
    start_date: "May 2022",
    end_date: "June 2026",
    cgpa: "3.69/4.00",
    institution_location: "Dhaka, Bangladesh",
    institution_website: "https://mist.ac.bd",
    activities: [
      {
        name: "MIST Computer Club",
        role: "President",
        period: "Jul'25 – Jun'26",
      },
      {
        name: "MIST Computer Club",
        role: "Assistant Secretary",
        period: "Feb'24 – Jun'25",
      },
      {
        name: "MIST Computer Club",
        role: "Core Member & Programming Mentor",
        period: "2022 – 2026",
      },
    ],
    notableAchievements: [
      "Won multiple intra-university programming contests and hackathons.",
      "Organized Talent Hunt 2025 for Level-1 students as club president.",
      "Mentored junior students in basic to competitive programming.",
      "Dean's List recognition for academic excellence in level 3.",
    ],
  },
  {
    name_of_institution: "Savar Cantonment Public School and College",
    degree: "Higher Secondary Certificate (HSC)",
    field_of_study: "Science",
    start_date: "2019",
    end_date: "2021",
    cgpa: "5.00/5.00",
    institution_location: "Savar, Bangladesh",
    institution_website: "https://www.scpsc.edu.bd/",
  },
];

export const workExperience: WorkExperience[] = [
  {
    company_name: "Enosis Solutions",
    role: [
      {
        name: "Software Engineer L1",
        start_date: "Jul 2025",
        end_date: "Present",
      },
    ],
    description:
      "Working as a Software Engineer at Enosis Solutions, contributing to the development of innovative software solutions and collaborating with cross-functional teams to deliver high-quality products.",
    responsibilities: [
      "Developing and maintaining software applications.",
      "Collaborating with team members to design and implement new features.",
      "Participating in code reviews and providing constructive feedback.",
      "Troubleshooting and resolving software defects and issues.",
    ],
    is_currently_working: true,
    technologies: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "C#",
      ".NET",
      "SQL",
      "Git",
    ],
    company_website: "https://www.enosisbd.com/",
    company_location: "Dhaka, Bangladesh",
    achievements: [],
    metrics: [],
  },
  {
    company_name: "Tekarsh",
    role: [
      {
        name: "Software Engineer Intern",
        start_date: "Jan 2025",
        end_date: "Mar 2025",
      },
    ],
    description:
      "Completed an industrial training program where I worked on a web application while gaining practical experience with software development practices.",
    responsibilities: [
      "Participated in industry training sessions and project discussions.",
      "Developed the company's main platform website.",
      "Applied industry-standard development practices throughout the project.",
      "Collaborated with team members during the development process.",
    ],
    is_currently_working: false,
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Express.js",
      "Git",
    ],
    company_website: "https://tekarsh.com/",
    company_location: "Dhaka, Bangladesh",
    achievements: [
      "Delivered a production-ready company website within a tight 3-week timeline",
      "Integrated AI-powered resume screening feature in the admin panel",
      "Received positive feedback from the team for code quality and project ownership",
    ],
    metrics: [
      { label: "Timeline", value: "3 weeks" },
      { label: "Features Delivered", value: "6+" },
    ],
  },
];

export const volunteerExperience: VolunteerExperience[] = [
  {
    organization_name: "MIST Computer Club",
    role: [
      {
        name: "President",
        start_date: "Jul 2025", 
        end_date: "Jun 2026",
      },
      {
        name: "Assistant Secretary",
        start_date: "Feb 2024",
        end_date: "Jun 2025",
      },
      {
        name: "Programming Mentor",
        start_date: "Feb 2023",
        end_date: "Jun 2026",
      },
      {
        name: "Club Member",
        start_date: "Apr 2022",
        end_date: "Feb 2023",
      }
    ],
    description:
      "Leading one of the most active clubs at MIST which focuses on basic c programming to competitive programming and technology-related activities. As President and Assistant Secretary, I oversee the club's operations, mentor junior members and organize events and workshops.",
    responsibilities: [
      "Managed the overall operations of the club.",
      "Oversaw multiple committees and coordinated their activities.",
      "Introduced and managed programming courses for junior members.",
      "Represented MIST in national and international programming competitions.",
    ],
    organization_website: "https://computerclub.mist.ac.bd",
  },
  {
    organization_name: "MIST Talent Hunt 2025",
    role: [
      {
        name: "Problem Setter, Organizer & Judge",
        start_date: "Jul 2025",
        end_date: "Jul 2025",
      },
    ],
    description:
      "Served as an organizer, problem setter and judge for the programming competition segment of MIST Talent Hunt 2025, ensuring a smooth and engaging contest experience.",
    responsibilities: [
      "Organized the programming competition for Level-1 students.",
      "Designed and tested programming contest problems.",
      "Worked closely with other setters and testers.",
      "Judged submissions and ensured fair contest execution.",
    ]
  },
];
