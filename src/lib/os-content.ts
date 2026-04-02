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

/** Parent platform — example project grouping (SurfSeer, CycleSeer, CampSeer) */
export const SEER_LABS: SeerLabsHub = {
  name: "Seer Labs",
  descriptionLines: ["Platform for building data-driven applications and systems."],
  impactLine: "→ Ships SurfSeer, CycleSeer, and CampSeer as separate modules—shared stack, independent deploys.",
  tags: ["Full Stack", "Data Systems", "Platform"],
  badgeLabels: ["Primary platform", "Core system"],
  demoUrl: "https://theseerlab.com/",
  modules: [
    {
      name: "SurfSeer",
      description: "Marine forecasting system using real-time data to generate condition scores.",
      highlights: ["700+ users in first week", "Real-time ingestion and scoring pipelines"],
      tags: ["Next.js", "APIs", "Data Processing"],
      demoUrl: "https://surfcheckseer.com/",
      githubUrl: "https://github.com/rodriseer/surfseer",
    },
    {
      name: "CycleSeer",
      description: "Cycling route analysis tool based on elevation, distance, and ride metrics.",
      tags: ["Routing", "Mapbox", "UI/UX"],
      demoUrl: "https://cycleseer.com/",
    },
    {
      name: "CampSeer",
      description: "Decision tool that evaluates environmental and weather conditions.",
      tags: ["Weather APIs", "Scoring Logic"],
      demoUrl: "https://campseer.vercel.app/",
    },
  ],
};

export const OTHER_PROJECTS: ProjectModule[] = [
  {
    name: "Side A AI",
    description: "AI-assisted tool for tagging and organizing image datasets.",
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
  { title: "Delivery", detail: "5+ full-stack apps taken from idea through deploy—APIs, UI, and data in the loop." },
  { title: "Reach", detail: "700+ users in week one on a shipped launch—real traffic, not a demo." },
  { title: "Lead", detail: "Owned team project scope through delivery: clear outputs and shipped milestones." },
];

/** Résumé PDF served from `/public/resume.pdf` */
export const RESUME_PDF = {
  href: "/resume.pdf",
  filename: "resume.pdf",
  downloadAs: "Rodrigo_Seers_Resume.pdf",
} as const;

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
        detail: "See Resume panel above for the PDF. Add more entries here as needed.",
      },
    ],
  },
];
