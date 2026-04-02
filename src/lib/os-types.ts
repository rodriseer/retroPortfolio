import { assets } from "@/lib/assets";

export const OS_SCREENS = [
  "home",
  "profile",
  "projects",
  "skills",
  "files",
  "contact",
] as const;

export type OSScreenId = (typeof OS_SCREENS)[number];

export const OS_NAV: {
  id: OSScreenId;
  /** Uppercase domain shown in system chrome (SYSTEM, PROJECTS, …) */
  systemSection: string;
  label: string;
  subtitle: string;
  icon: string;
}[] = [
  { id: "home", systemSection: "SYSTEM", label: "Home", subtitle: "Boot & overview", icon: assets.icons.home },
  { id: "profile", systemSection: "PROFILE", label: "Profile", subtitle: "Player data", icon: assets.icons.info },
  { id: "projects", systemSection: "PROJECTS", label: "Projects", subtitle: "Missions", icon: assets.icons.briefcase },
  { id: "skills", systemSection: "SKILLS", label: "Skills", subtitle: "Stats", icon: assets.icons.gear },
  { id: "files", systemSection: "FILES", label: "Files", subtitle: "/system", icon: assets.icons.document },
  { id: "contact", systemSection: "CONTACT", label: "Contact", subtitle: "Comm", icon: assets.icons.letter },
];
