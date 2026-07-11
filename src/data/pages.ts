export interface PageData {
  slug: string;
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

const PAGES: PageData[] = [
  {
    slug: "about",
    title: "About Me",
    content:
      "I am Yusuf Reza Hasnat — a Software Engineer, Competitive Programmer and MIST CSE Graduate. I am currently working as a Software Engineer at Enosis Solutions. I have a strong passion for problem-solving, coding and exploring new technologies. In my free time, I enjoy participating in programming contests and contributing to projects.",
    seoTitle: "About | Yusuf Reza Hasnat",
    seoDescription:
      "Learn more about Yusuf Reza Hasnat — Software Engineer, Competitive Programmer and MIST CSE Graduate at MIST.",
    seoKeywords:
      "about, Yusuf Reza Hasnat, hasnat, yusuf reza, hasnat0006, competitive programming, MIST CSE",
  },
  {
    slug: "contact",
    title: "Contact",
    content:
      "Feel free to reach out to me via email at yusufrezahasnat0006@gmail.com or connect with me on any social media platform.",
    seoTitle: "Contact | Yusuf Reza Hasnat",
    seoDescription:
      "Get in touch with Yusuf Reza Hasnat — send an email or connect on any social media platform.",
    seoKeywords: "contact, email, hasnat0006, GitHub, Codeforces",
  },
];

export function getPageBySlug(slug: string): PageData | undefined {
  return PAGES.find((page) => page.slug === slug);
}

export function getAllSlugs(): string[] {
  return PAGES.map((page) => page.slug);
}
