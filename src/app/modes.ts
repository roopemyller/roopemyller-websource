import type { IconType } from "react-icons";
import { FaCode, FaCamera, FaCrosshairs } from "react-icons/fa";

export type Mode = "developer" | "photography" | "shooting";

export interface ModeSection {
  id: string;
  label: string;
}

export interface ModeMeta {
  id: Mode;
  label: string;
  shortLabel: string;
  icon: IconType;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  aboutHeading: string;
  aboutBio: string;
  aboutChipsLabel: string;
  aboutChips: string[];
  contactPrompt: string;
  sections: ModeSection[];
}

export const MODE_ORDER: Mode[] = ["developer", "photography", "shooting"];

export const MODES: Record<Mode, ModeMeta> = {
  developer: {
    id: "developer",
    label: "Developer",
    shortLabel: "Dev",
    icon: FaCode,
    heroEyebrow: "Software Engineering Student",
    heroTitle: "Roope Myller",
    heroSubtitle: "Building modern web apps & tinkering with embedded systems.",
    heroTagline:
      "Studying software engineering, shipping side projects, and always poking at new tech. Keyboard goes clickity-clackity...",
    aboutHeading: "About Me",
    aboutBio:
      "Hi! I'm a software engineering student who loves building modern web apps, tinkering with Arduinos and embedded systems, and exploring the world of Linux.",
    aboutChipsLabel: "Skills",
    aboutChips: [
      "Python",
      "React",
      "TypeScript",
      "Java",
      "C",
      "Node.js",
      "ASP.NET",
      "Visual Basic",
      "MongoDB",
      "Postgres",
      "SQLite",
      "SQL Server (SSMS)",
      "Linux",
      "Embedded Systems",
      "Claude Code",
    ],
    contactPrompt: "Let's build something together",
    sections: [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "career", label: "Career" },
      { id: "academics", label: "Academics" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
  },
  photography: {
    id: "photography",
    label: "Photography",
    shortLabel: "Photo",
    icon: FaCamera,
    heroEyebrow: "Freelance Photographer",
    heroTitle: "Roope Myller",
    heroSubtitle: "Capturing moments through my lens.",
    heroTagline:
      "From portraits to landscapes — always chasing the right light and the moment worth keeping.",
    aboutHeading: "Behind the Lens",
    aboutBio:
      "I shoot freelance alongside my studies — portraits, events, sports and landscapes. I care about natural light, honest moments, and images that remind you of the special moments in life.",
    aboutChipsLabel: "Focus areas",
    aboutChips: ["Portraits", "Events", "Sports", "Landscape"],
    contactPrompt: "Interested in a shoot or prints?",
    sections: [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "instagram", label: "Instagram" },
      { id: "gallery", label: "Gallery" },
      { id: "contact", label: "Contact" },
    ],
  },
  shooting: {
    id: "shooting",
    label: "SRA",
    shortLabel: "SRA",
    icon: FaCrosshairs,
    heroEyebrow: "SRA Competitor",
    heroTitle: "Roope Myller",
    heroSubtitle: "Competing in practical shooting sports.",
    heroTagline: "SRA — precision, speed, and controlled chaos on the range.",
    aboutHeading: "On The Range",
    aboutBio:
      "I compete in SRA (Sovellettu Reserviläisammunta) — Finland's practical shooting sports combining rifle, pistol and shotgun stages under time pressure. Equal parts precision, speed, and staying calm when the buzzer goes off.",
    aboutChipsLabel: "Disciplines",
    aboutChips: [
      "SRA",
      "Precision",
      "Speed",
      "Accuracy",
      "Pressure",
      "Pistol Shooting",
      "Rifle Shooting",
      "Shotgun Shooting",
      "Competition Strategy",
      "Range Safety",
    ],
    contactPrompt: "Talk shop, gear, or matches",
    sections: [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "results", label: "Results" },
      { id: "videos", label: "Videos" },
      { id: "gallery", label: "Gallery" },
      { id: "contact", label: "Contact" },
    ],
  },
};
