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
}

export interface WorkExperience {
  company_name: string;
  position: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
  company_logo?: string;
  company_website?: string;
  company_location?: string;
  is_currently_working?: boolean;
  description?: string;
}

export interface VolunteerExperience {
  organization_name: string;
  role: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
  organization_logo?: string;
  organization_website?: string;
  organization_location?: string;
  is_currently_volunteering?: boolean;
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
  },
  {
    name_of_institution: "Savar Cantonment Public School and College",
    degree: "Higher Secondary Certificate (HSC)",
    field_of_study: "Science",
    start_date: "2019",
    end_date: "2021",
    cgpa: "5.00/5.00",
    institution_location: "Savar, Bangladesh",
    institution_website: "https://www.savarcantonmentcollege.edu.bd",
  }
];

export const workExperience: WorkExperience[] = [
  {
    company_name: "Enosis Solutions",
    position: "Software Engineer",
    start_date: "Jul 2025",
    end_date: "Present",
    description:
      "Working as a Software Engineer at Enosis Solutions, contributing to the development of innovative software solutions and collaborating with cross-functional teams to deliver high-quality products.",
    responsibilities: [
      "Developing and maintaining software applications.",
      "Collaborating with team members to design and implement new features.",
      "Participating in code reviews and providing constructive feedback.",
      "Troubleshooting and resolving software defects and issues.",
    ],
    is_currently_working: true,
  },
  {
    company_name: "Tekarsh",
    position: "Industrial Trainee",
    start_date: "May 2025",
    end_date: "Jun 2025",
    description:
      "Completed an industrial training program where I worked on a real-world web application while gaining practical experience with modern software development practices and collaborative workflows.",
    responsibilities: [
      "Participated in industry training sessions and project discussions.",
      "Developed the company's main platform website.",
      "Applied industry-standard development practices throughout the project.",
      "Collaborated with team members during the development process.",
    ],
    is_currently_working: false,
  },
];

export const volunteerExperience: VolunteerExperience[] = [
  {
    organization_name: "MIST Computer Club",
    role: "President, Assistant Secretary & Mentor",
    start_date: "Feb 2023",
    end_date: "Jun 2026",
    description:
      "Leading one of the most active clubs at MIST which focuses on competitive programming, software development, and technology-related activities. As President and Assistant Secretary, I oversee the club's operations, mentor junior members, and organize events and workshops.",
    responsibilities: [
      "Managed the overall operations of the club.",
      "Oversaw multiple committees and coordinated their activities.",
      "Introduced and managed programming courses for junior members.",
      "Represented MIST in national and international programming competitions.",
    ],
    is_currently_volunteering: true,
    organization_website: "https://mcc.mist.ac.bd",
  },
  {
    organization_name: "MIST Talent Hunt 2025",
    role: "Organizer, Problem Setter & Judge",
    start_date: "Jul 2025",
    end_date: "Jul 2025",
    description:
      "Served as an organizer, problem setter and judge for the programming competition segment of MIST Talent Hunt 2025, ensuring a smooth and engaging contest experience.",
    responsibilities: [
      "Organized the programming competition for Level-1 students.",
      "Designed and tested programming contest problems.",
      "Worked closely with other setters and testers.",
      "Judged submissions and ensured fair contest execution.",
    ],
    is_currently_volunteering: false,
  },
];
