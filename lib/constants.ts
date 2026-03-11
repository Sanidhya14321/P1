import { portfolioData, featuredProjects, allProjects } from "@/data/portfolio";

const totalSkillsItems = Object.values(portfolioData.skills).reduce((acc, curr) => acc + curr.length, 0);
const totalProjects = featuredProjects.length + allProjects.length;
const totalExperience = portfolioData.experience.length + 1; // +1 for education

// Dynamic Spacing Logic
// We map these constants directly into our absolute GSAP timeline logic.
const HERO_Z = 0;
const HERO_SCROLL = 800;

const ABOUT_Z = HERO_Z - HERO_SCROLL;
const ABOUT_SCROLL = 1000;

// Skills helix takes up space proportional to every single skill item (120px depth per item)
const SKILLS_Z = ABOUT_Z - ABOUT_SCROLL;
const SKILLS_SCROLL = Math.max(2000, totalSkillsItems * 120);

// Projects gallery takes up space proportional to items (500px depth per item)
const PROJECTS_Z = SKILLS_Z - SKILLS_SCROLL;
const PROJECTS_SCROLL = Math.max(2500, totalProjects * 500);

// Experience takes up space proportional to items (for camera Y/Z pan)
const EXPERIENCE_Z = PROJECTS_Z - PROJECTS_SCROLL;
const EXPERIENCE_SCROLL = Math.max(2500, totalExperience * 800);

const CONTACT_Z = EXPERIENCE_Z - EXPERIENCE_SCROLL;
const CONTACT_SCROLL = 1500;

export const Z_POSITIONS = {
  hero: HERO_Z,
  about: ABOUT_Z,
  skills: SKILLS_Z,
  projects: PROJECTS_Z,
  experience: EXPERIENCE_Z,
  contact: CONTACT_Z,
} as const;

export const CAMERA_STOPS = {
  hero: { z: Z_POSITIONS.hero, scrollDistance: 0 },
  about: { z: Z_POSITIONS.about, scrollDistance: Math.abs(ABOUT_Z) },
  skills: { z: Z_POSITIONS.skills, scrollDistance: Math.abs(SKILLS_Z) },
  projects: { z: Z_POSITIONS.projects, scrollDistance: Math.abs(PROJECTS_Z) },
  experience: { z: Z_POSITIONS.experience, scrollDistance: Math.abs(EXPERIENCE_Z) },
  contact: { z: Z_POSITIONS.contact, scrollDistance: Math.abs(CONTACT_Z) },
  end: { z: CONTACT_Z - CONTACT_SCROLL, scrollDistance: Math.abs(CONTACT_Z - CONTACT_SCROLL) },
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

export const EASING = {
  default: "cubic-bezier(0.16, 1, 0.3, 1)", 
  depth: "cubic-bezier(0.4, 0, 0.2, 1)", 
} as const;

export const DURATIONS = {
  micro: 0.15,
  default: 0.4,
  cinematic: 1.0,
} as const;

export const SECTIONS = [
  { id: "hero", label: "Launch", z: Z_POSITIONS.hero },
  { id: "about", label: "About", z: Z_POSITIONS.about },
  { id: "skills", label: "Skills", z: Z_POSITIONS.skills },
  { id: "projects", label: "Projects", z: Z_POSITIONS.projects },
  { id: "experience", label: "Experience", z: Z_POSITIONS.experience },
  { id: "contact", label: "Contact", z: Z_POSITIONS.contact },
];
