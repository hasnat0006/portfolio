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
      "I am Yusuf Reza Hasnat — an Algorithmic Systems Engineer, Competitive Programmer, and Biomedical Researcher. I am currently pursuing my undergraduate degree in Computer Science and Engineering at the Military Institute of Science and Technology (MIST).",
    seoTitle: "About | Yusuf Reza Hasnat",
    seoDescription:
      "Learn more about Yusuf Reza Hasnat — Algorithmic Systems Engineer, Competitive Programmer, and Biomedical Researcher at MIST.",
    seoKeywords:
      "about, Yusuf Reza Hasnat, hasnat0006, competitive programming, MIST CSE",
  },
  {
    slug: "contact",
    title: "Contact",
    content:
      "Feel free to reach out to me via email at yusufrezahasnat0006@gmail.com or connect with me on GitHub and Codeforces.",
    seoTitle: "Contact | Yusuf Reza Hasnat",
    seoDescription:
      "Get in touch with Yusuf Reza Hasnat — send an email or connect on GitHub and Codeforces.",
    seoKeywords: "contact, email, hasnat0006, GitHub, Codeforces",
  },
];

export function getPageBySlug(slug: string): PageData | undefined {
  return PAGES.find((page) => page.slug === slug);
}

export function getAllSlugs(): string[] {
  return PAGES.map((page) => page.slug);
}

export function getAllPages(): PageData[] {
  return [...PAGES];
}
