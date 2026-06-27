export interface ICPCAchievement {
  place: string;
  contest: string;
  team: string;
}

export interface IUPCAchievement {
  place: string;
  contest: string;
  team: string;
}

export interface OtherAchievement {
  title: string;
  detail: string;
}

export const ICPC_ACHIEVEMENTS: ICPCAchievement[] = [
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

export const IUPC_ACHIEVEMENTS: IUPCAchievement[] = [
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

export const OTHER_ACHIEVEMENTS: OtherAchievement[] = [
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
