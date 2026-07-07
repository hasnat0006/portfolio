export interface ContestAchievement {
  rank: number | string;
  problem_solved?: number;
  contest_name: string;
  team_name: string;
  total_teams: number;
  hosted_by: string;
  standings_url?: string;
  post_url?: string[];
  contest_type?: string;
}

export interface OtherAchievement {
  title: string;
  detail: string;
  hosted_by: string;
  photo_url?: string[];
  post_url?: string[];
  type:string
}

export const KEY_CONTEST_ACHIEVEMENTS: ContestAchievement[] = [
  {
    rank: 1,
    contest_name: "Intra MIST Solo Blind Contest 2024 (Senior Category)",
    hosted_by: "MIST Computer Club (MCC)",
    contest_type: "INTRA MIST",
    post_url: ["https://www.facebook.com/share/p/1HX4V3c3vS/"],
    problem_solved: 4,
    total_teams: 30,
    team_name: "Yusuf Reza Hasnat",
  },
  {
    rank: 1,
    contest_name: "Inter MIST Hackathon 2025",
    hosted_by: "MIST Computer Club (MCC)",
    post_url: ["https://www.facebook.com/share/p/1BTUehqdrg/"],
    total_teams: 20,
    team_name: "MIST_Untitled",
    contest_type: "INTRA MIST",
  },
  {
    rank: 2,
    contest_name: "BUP Inter Army University Programming Contest 2025",
    team_name: "MIST_Untitled",
    problem_solved: 6,
    total_teams: 29,
    hosted_by: "Bangladesh University of Professionals (BUP)",
    standings_url:
      "https://toph.co/c/dsi-presents-bup-cse-tech-carnival-2025/standings#:~:text=2-,MIST_Untitled,-Military%20Institute%20of",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/6ad25242-db30-49f1-9f78-e947336e15d7",
      "https://www.facebook.com/share/1BPSxkqoT9/",
    ],
    contest_type: "ARMY IUPC",
  },
  {
    rank: 3557,
    contest_name: "Meta Hacker Cup 2023",
    team_name: "Yusuf Reza Hasnat",
    hosted_by: "Meta",
    contest_type: "META HACKER CUP",
    total_teams: 20324,
    standings_url:
      "https://www.facebook.com/codingcompetitions/hacker-cup/2023/round-2/scoreboard",
  },
  {
    rank: 77,
    contest_name: "ICPC Asia Dhaka Regional Onsite Contest 2025",
    team_name: "MIST_Untitled",
    problem_solved: 3,
    total_teams: 313,
    hosted_by: "Bangladesh University of Business and Technology (BUBT)",
    standings_url:
      "https://bapsoj.org/contests/icpc-dhaka-onsite-2025/standings#:~:text=MIST_Untitled,SCIENCE%20AND%20TECHNOLOGY",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/c05fd14b-4b00-408d-97ac-dc31a9825091",
      "https://www.facebook.com/share/p/18kaMGk9Aw/",
    ],
    contest_type: "ICPC REGIONAL",
  },
  {
    rank: 114,
    contest_name: "ICPC Asia Dhaka Regional Onsite Contest 2024",
    team_name: "MIST_YaminIsAlive",
    problem_solved: 3,
    total_teams: 300,
    hosted_by: "Daffodil International University(DIU)",
    standings_url:
      "https://bapsoj.org/contests/icpc-asia-dhaka-regional-contest-2024-onsite-round/standings#:~:text=MIST_YaminIsAlive,SCIENCE%20AND%20TECHNOLOGY",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/af4f7faa-01a1-4dca-9f6d-4c37f55028f9",
      "https://www.facebook.com/share/p/1BX8HnujRk/",
    ],
    contest_type: "ICPC REGIONAL",
  },
];

export const CONTEST_ACHIEVEMENTS: ContestAchievement[] = [
  {
    rank: 28,
    contest_name: "UIU Inter University Programming Contest 2025",
    team_name: "MIST_Volatile",
    problem_solved: 5,
    total_teams: 157,
    hosted_by: "United International University (UIU)",
    standings_url:
      "https://bapsoj.org/contests/uiu-inter-university-programming-contest-2025/standings#:~:text=28-,MIST_Volatile,-MILITARY%20INSTITUTE%20OF",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/e0d87c96-1c23-4227-bf03-ae4d729e346a",
    ],
  },
  {
    rank: 28,
    contest_name: "MU Inter University Programming Contest 2025",
    team_name: "MIST_Untitled",
    problem_solved: 2,
    total_teams: 98,
    hosted_by: "Metropolitan University (MU)",
    standings_url:
      "https://toph.co/c/inter-university-mu-cse-fest-2025/standings#:~:text=28-,MIST_Untitled,-Military%20Institute%20of",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/c6c3ba53-9c49-4a3f-b2c9-0eacbe5082f4",
    ],
  },
  {
    rank: 30,
    contest_name: "AUST Inter University Programming Contest 2025",
    team_name: "MIST_273.16_Kelvin",
    problem_solved: 4,
    total_teams: 130,
    hosted_by: "Ahsanullah University of Science and Technology (AUST)",
    standings_url:
      "https://toph.co/c/mtb-presents-aust-inter-university-2025/standings#:~:text=30-,MIST_273.16_Kelvin,-Military%20Institute%20of",
  },
  {
    rank: 42,
    contest_name: "KUET Inter University Programming Contest 2025",
    team_name: "MIST_Volatile",
    problem_solved: 3,
    total_teams: 157,
    hosted_by: "Khulna University of Engineering and Technology (KUET)",
    standings_url:
      "https://bapsoj.org/contests/miaki-presents-kuet-iupc-onsite-2025/standings#:~:text=42-,MIST_Volatile,-MILITARY%20INSTITUTE%20OF",
  },
  {
    rank: 54,
    contest_name: "IUT Inter University Programming Contest 2024",
    team_name: "MIST_potato_coders",
    problem_solved: 1,
    total_teams: 108,
    hosted_by: "Islamic University of Technology (IUT)",
    standings_url:
      "https://toph.co/c/iut-11th-national-ict-fest-2024/standings#:~:text=54-,MIST_potato_coders,-Military%20Institute%20of",
  },

  {
    rank: 54,
    contest_name: "BUET Inter University Programming Contest 2026",
    team_name: "MIST_Untitled",
    problem_solved: 6,
    total_teams: 110,
    hosted_by: "Bangladesh University of Engineering and Technology (BUET)",
    standings_url:
      "https://toph.co/c/inter-university-buet-cse-fest-2026/standings#:~:text=54-,MIST_Untitled,-MILITARY%20INSTITUTE%20OF",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/b1a2e303-72be-4980-8772-6ed1008ccc6b",
    ],
  },
  {
    rank: 63,
    contest_name: "BUET Inter University Programming Contest 2024",
    team_name: "MIST_YaminIsAlive",
    problem_solved: 4,
    total_teams: 113,
    hosted_by: "Bangladesh University of Engineering and Technology (BUET)",
    standings_url:
      "https://toph.co/c/inter-university-buet-cse-fest-2024/standings#:~:text=63-,MIST_YaminIsAlive,-Military%20Institute%20of",
  },
  {
    rank: 65,
    contest_name: "UU Inter University Programming Contest 2025",
    team_name: "MIST_273.16K",
    problem_solved: 4,
    total_teams: 123,
    hosted_by: "Uttara University (UU)",
    standings_url:
      "https://toph.co/c/uttara-university-inter-university-2025/standings#:~:text=65-,MIST_273.16K,-Military%20Institute%20of",
  },
  {
    rank: 67,
    contest_name: "CUET Inter University Programming Contest 2025",
    team_name: "MIST_Untitled",
    problem_solved: 4,
    total_teams: 130,
    hosted_by: "Chittagong University of Engineering and Technology (CUET)",
    standings_url:
      "https://toph.co/c/cuet-iupc-2025/standings#:~:text=67-,MIST_Untitled,-MILITARY%20INSTITUTE%20OF",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/03f91b3f-0c90-433a-b8ee-1936cbd9996b",
    ],
  },
  {
    rank: 15,
    contest_name: "MIST Independence Day Programming Contest 2023",
    team_name: "MIST_CG0_nai_CP0_nai",
    problem_solved: 3,
    total_teams: 60,
    hosted_by: "MIST Computer Club (MCC)",
  },
  {
    rank: 112,
    contest_name: "SUST Inter University Programming Contest 2024",
    team_name: "MIST_Genesis",
    problem_solved: 1,
    total_teams: 120,
    hosted_by: "Shahjalal University of Engineering and Technology (SUST)",
    standings_url:
      "https://toph.co/c/inter-university-sust-cse-carnival-2024/standings#:~:text=112-,MIST_Genesis,-Military%20Institute%20of",
  },

  {
    rank: 114,
    contest_name: "ICPC Asia Dhaka Regional Online Preliminary Contest 2024",
    team_name: "MIST_YaminIsAlive",
    problem_solved: 4,
    total_teams: 2400,
    hosted_by: "Daffodil International University(DIU)",
    standings_url:
      "https://bapsoj.org/contests/icpc-preliminary-dhaka-site-2024/standings#:~:text=26-,MIST_YaminIsAlive,-MILITARY%20INSTITUTE%20OF",
  },

  {
    rank: 144,
    contest_name: "National Collegiate Programming Onsite Contest 2023",
    team_name: "MIST_CG0_nai_CP0_nai",
    problem_solved: 3,
    total_teams: 197,
    hosted_by: "Jahangirnagar University (JU)",
    standings_url:
      "https://bapsoj.org/contests/ncpc-onsite-2023-hosted-by-ju/standings#:~:text=MIST_CG0_nai_CP0_nai",
    post_url: [
      "https://computerclub.mist.ac.bd/achievements/dea7088c-d972-4e7e-b967-b60a532d28ad",
      "https://www.facebook.com/share/p/1KemoPps1H/",
    ],
  },
  {
    rank: 153,
    contest_name:
      "National Collegiate Programming Online Preliminary Contest 2023",
    team_name: "MIST_CG0_nai_CP0_nai",
    problem_solved: 2,
    total_teams: 1045,
    hosted_by: "Jahangirnagar University (JU)",
    standings_url:
      "https://bapsoj.org/contests/ncpc-preliminary-ju-2023/standings#:~:text=MIST_CG0_nai_CP0_nai",
  },
  {
    rank: 225,
    contest_name: "ICPC Asia Dhaka Regional Onsite Preliminary Contest 2025",
    team_name: "MIST_Untitled",
    problem_solved: 3,
    total_teams: 1842,
    hosted_by: "Bangladesh University of Business and Technology (BUBT)",
    standings_url:
      "https://bapsoj.org/contests/icpc-dhaka-2025-online-preliminary/standings#:~:text=MIST_Untitled,SCIENCE%20AND%20TECHNOLOGY",
  },
  {
    rank: 439,
    contest_name: "ICPC Asia Dhaka Regional Online Preliminary Contest 2023",
    team_name: "MIST_BinaryBrigade",
    problem_solved: 2,
    total_teams: 2400,
    hosted_by: "Bangladesh University of Business and Technology (BUBT)",
    standings_url:
      "https://bapsoj.org/contests/icpc-preliminary-dhaka-site-2024/standings#:~:text=26-,MIST_YaminIsAlive,-MILITARY%20INSTITUTE%20OF",
  },
];

export const OTHER_ACHIEVEMENTS: OtherAchievement[] = [
  {
    title: "Dean Award",
    detail: "Maintaining a CGPA of 3.75 or above in level 3",
    hosted_by: "Military Institute of Science and Technology (MIST)",
    type:"Academic"
  },
  {
    title: "First Solver — Problem H",
    detail: "IUT Inter-University Programming Contest 2024",
    hosted_by: "Islamic University of Technology (IUT)",
    type:"First Solver"
  },
  {
    title: "Promising Team — Independence Day Programming Contest 2023",
    detail: "Special recognition in the contest",
    hosted_by: "MIST Computer Club (MCC)",
    type:"Recognition"
  },
];
