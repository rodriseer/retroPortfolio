/** Portfolio content — projects, contact, files, skills */

export const CONTACT = {
  email: "mailto:rodrigo16seer@gmail.com",
  github: "https://github.com/rodriseer",
  linkedin: "https://www.linkedin.com/in/rodrigo-seer-a692a0328/",
} as const;

/** Single deployable / module row */
export type ProjectModule = {
  name: string;
  description: string;
  /** Short supporting line (optional if highlights used) */
  impactLine?: string;
  /** Bullet-style signals, e.g. launch metrics */
  highlights?: readonly string[];
  tags: readonly string[];
  demoUrl?: string;
  githubUrl?: string;
};

export type SeerLabsHub = {
  name: string;
  descriptionLines: readonly string[];
  impactLine: string;
  tags: readonly string[];
  badgeLabels: readonly string[];
  demoUrl: string;
  githubUrl?: string;
  modules: ProjectModule[];
};

/** Parent platform — SurfSeer, CycleSeer, CampSeer ship under this brand */
export const SEER_LABS: SeerLabsHub = {
  name: "Seer Labs",
  descriptionLines: [
    "Platform for building data-driven tools for outdoor decision-making.",
    "Includes SurfSeer, CycleSeer, and CampSeer — systems that turn real-time data into usable insights.",
  ],
  impactLine: "Hub for outdoor intelligence products and shared platform work.",
  tags: ["Full Stack", "Data Systems", "Product Design"],
  badgeLabels: ["Primary platform", "Core system"],
  demoUrl: "https://theseerlab.com/",
  modules: [
    {
      name: "SurfSeer",
      description: "Marine forecasting tool that scores surf conditions using live data.",
      highlights: ["700+ users in first week", "Processes real-time marine data"],
      tags: ["Next.js", "APIs", "Data Processing"],
      demoUrl: "https://surfcheckseer.com/",
      githubUrl: "https://github.com/rodriseer/surfseer",
    },
    {
      name: "CycleSeer",
      description:
        "Cycling route intelligence tool that evaluates routes based on elevation, distance, and ride quality.",
      tags: ["Routing", "Mapbox", "UI/UX"],
      demoUrl: "https://cycleseer.com/",
    },
    {
      name: "CampSeer",
      description:
        "Camping decision tool that analyzes weather, night conditions, and environmental factors. Helps users choose the best time and place to camp.",
      tags: ["Weather APIs", "Scoring Logic"],
      demoUrl: "https://campseer.vercel.app/",
    },
  ],
};

export const OTHER_PROJECTS: ProjectModule[] = [
  {
    name: "Side A AI",
    description:
      "AI-assisted desktop tool that tags and organizes photos to improve creative workflow.",
    tags: ["Python", "AI", "Computer Vision"],
    githubUrl: "https://github.com/rodriseer/sideA",
  },
];

export const TOTAL_PROJECT_SLOTS =
  1 + SEER_LABS.modules.length + OTHER_PROJECTS.length;

export type SkillStat = { name: string; value: number };

/** Languages · Web · Data · Tools */
export const SKILL_GROUPS: { category: string; stats: SkillStat[] }[] = [
  {
    category: "Languages",
    stats: [
      { name: "Python", value: 88 },
      { name: "TypeScript", value: 84 },
      { name: "Java", value: 76 },
      { name: "SQL", value: 80 },
    ],
  },
  {
    category: "Web",
    stats: [
      { name: "Next.js", value: 86 },
      { name: "React", value: 82 },
      { name: "APIs", value: 85 },
      { name: "UI / UX", value: 78 },
    ],
  },
  {
    category: "Data",
    stats: [
      { name: "Pipelines", value: 78 },
      { name: "Analysis", value: 80 },
      { name: "Real-time feeds", value: 74 },
    ],
  },
  {
    category: "Tools",
    stats: [
      { name: "Git", value: 88 },
      { name: "Cloud / deploy", value: 76 },
      { name: "Automation", value: 72 },
    ],
  },
];

export const ACHIEVEMENTS: { title: string; detail: string }[] = [
  { title: "Shipper", detail: "Built 5+ full-stack apps end to end." },
  { title: "Reach", detail: "700+ users in the first week (SurfSeer launch)." },
  { title: "Lead", detail: "Led a team project from idea to delivery." },
];

export type FileEntry =
  | {
      name: string;
      type: "file";
      hint: string;
      href: string;
      external: boolean;
    }
  | {
      name: string;
      type: "dir";
      hint: string;
      children: { name: string; detail?: string }[];
    };

export const FILE_ENTRIES: FileEntry[] = [
  {
    name: "CERTS/",
    type: "dir",
    hint: "Certifications",
    children: [
      {
        name: "README.txt",
        detail: "Résumé line temporarily hidden. Add a PDF URL as a file entry in os-content when ready.",
      },
    ],
  },
];
