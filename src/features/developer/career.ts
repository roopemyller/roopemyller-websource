export interface Position {
  title: string;
  period: string;
  description?: string;
  skills?: string[];
}

export interface CareerEntry {
  organization: string;
  role?: string;
  type?: string;
  period: string;
  location?: string;
  description?: string;
  skills?: string[];
  positions?: Position[];
}

const career: CareerEntry[] = [
  {
    organization: "LUT University",
    location: "Lappeenranta, South Karelia, Finland",
    period: "Sep 2026 – Present",
    positions: [
      {
        title: "Teaching Assistant",
        period: "Sep 2026 – Present · Part-time · Hybrid",
        description:
          "Teaching assistant for CS1 (Python), Linux, and Computer Networks and Internet courses.",
        skills: [
          "Assistant Teaching",
          "Python (Programming Language)",
          "Linux",
          "Computer Networking",
        ],
      },
    ],
  },
  {
    organization: "Visma Solutions Oy",
    location: "Lappeenranta, South Karelia, Finland",
    period: "May 2026 – Aug 2026",
    positions: [
      {
        title: "Software Developer Trainee, Netvisor R&D",
        period: "May 2026 – Aug 2026 · Full-time · Hybrid",
        description:
          "Trainee role in the R&D team, focused on the bookkeeping and financial management side of Netvisor. Delivered usability improvements that enhance the experience for end users.",
        skills: [
          "ASP.NET Web Forms",
          "C#",
          "Visual Basic .NET (VB.NET)",
          "Microsoft SQL Server",
          "Claude Code",
        ],
      },
    ],
  },
  {
    organization: "LUT University",
    location: "Lappeenranta, South Karelia, Finland",
    period: "May 2025 – Jun 2026",
    positions: [
      {
        title: "Teaching Assistant",
        period: "Sep 2025 – Jun 2026 · Part-time · Hybrid",
        description:
          "Teaching assistant for CS1 (Python), Linux, and Object-Oriented Programming (Java) courses.",
        skills: [
          "Python (Programming Language)",
          "Assistant Teaching",
          "Linux",
          "Java",
          "Object-Oriented Programming (OOP)",
        ],
      },
      {
        title: "Junior Research Assistant",
        period: "May 2025 – Aug 2025 · Full-time · On-site",
        description:
          "Developed an automated feedback email system for students in the CS1 course (Python, Matplotlib, MongoDB). Teaching assistant for courses in Python, C, game development, and Linux.",
        skills: [
          "Python (Programming Language)",
          "Linux",
          "Data Visualization",
          "MongoDB",
          "Simple Mail Transfer Protocol (SMTP)",
        ],
      },
    ],
  },
  {
    organization: "LUT University",
    location: "Lappeenranta, South Karelia, Finland",
    period: "May 2024 – Dec 2024",
    positions: [
      {
        title: "Teaching Assistant",
        period: "Sep 2024 – Dec 2024 · Part-time · Hybrid",
        description: "Teaching assistant for the Basics of Linux course.",
        skills: ["Assistant Teaching"],
      },
      {
        title: "Junior Research Assistant",
        period: "May 2024 – Aug 2024 · Full-time · On-site",
        description:
          "Data visualization of assignment statistics for the CS1 course. Created new programming assignments in Python. Teaching assistant for Linux and game development (C#) courses.",
        skills: [
          "Python (Programming Language)",
          "Data Visualization",
          "Assistant Teaching",
        ],
      },
    ],
  },
  {
    organization: "Self-employed",
    role: "Logger",
    type: "Freelance",
    period: "Sep 2019 – May 2024",
  },
];

export default career;
