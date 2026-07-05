export interface Skill {
  name: string;
  iconId: string;
  aliases?: string[];
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export const SKILLS: SkillCategory[] = [
  {
    label: "Programming Languages",
    skills: [
      { name: "C", iconId: "c" },
      { name: "C++", iconId: "cpp" },
      { name: "JavaScript", iconId: "js" },
      { name: "TypeScript", iconId: "ts" },
      { name: "Python", iconId: "py" },
      { name: "Java", iconId: "java" },
      { name: "Dart", iconId: "dart" },
      { name: "SQL", iconId: "postgres", aliases: ["PLpgSQL", "TSQL"] },
      {
        name: "Bash",
        iconId: "bash",
        aliases: ["Shell", "Zsh", "Fish", "PowerShell"],
      },
      { name: "C#", iconId: "cs" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { name: "Next.js", iconId: "nextjs" },
      { name: "React", iconId: "react", aliases: ["React.js"] },
      { name: "Node.js", iconId: "nodejs", aliases: ["NodeJS"] },
      { name: "Express.js", iconId: "express" },
      { name: "Flutter", iconId: "flutter" },
      { name: "Tailwind CSS", iconId: "tailwind", aliases: ["TailwindCSS"] },
      { name: "HTML", iconId: "html" },
      { name: "CSS", iconId: "css" },
      { name: "jQuery", iconId: "jquery" },
      { name: "Arduino", iconId: "arduino" },
    ],
  },
  {
    label: "Databases & Tools",
    skills: [
      { name: "Supabase", iconId: "supabase" },
      { name: "PostgreSQL", iconId: "postgresql", aliases: ["Postgres"] },
      { name: "MySQL", iconId: "mysql" },
      { name: "Bun", iconId: "bun" },
      { name: "Docker", iconId: "docker" },
      { name: "Git", iconId: "git" },
      { name: "GitHub", iconId: "github" },
      { name: "Bitbucket", iconId: "bitbucket" },
      { name: ".NET", iconId: "dotnet" },
      { name: "LaTeX", iconId: "latex", aliases: ["TeX"] },
      { name: "VS Code", iconId: "vscode" },
    ],
  },
];

export function skillIconUrl(
  name: string,
  theme: "light" | "dark" = "light",
): string {
  const normalizedName = name.trim().toLowerCase();

  const skill = SKILLS.flatMap((category) => category.skills).find((item) => {
    const aliases = [item.name, ...(item.aliases ?? [])];
    return aliases.some(
      (alias) => alias.trim().toLowerCase() === normalizedName,
    );
  });

  if (!skill?.iconId) {
    return "";
  }

  return `https://skillicons.dev/icons?i=${skill.iconId}&theme=${theme}`;
}
