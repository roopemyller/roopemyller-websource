export interface Position {
  title: string;
  period: string;
  description?: string;
}

export interface CareerEntry {
  organization: string;
  role?: string;
  type?: string;
  period: string;
  location?: string;
  description?: string;
  positions?: Position[];
}

const career: CareerEntry[] = [
  {
    organization: 'Visma Solutions Oy · Netvisor R&D',
    role: 'Software Developer Trainee',
    type: 'Full-time',
    period: 'May 2026 – Present',
    description: 'ASP.NET Web Forms, C#',
  },
  {
    organization: 'LUT University',
    location: 'Lappeenranta, South Karelia, Finland',
    period: 'May 2025 – Jun 2026',
    positions: [
      {
        title: 'Teaching Assistant',
        period: 'Sep 2025 – Jun 2026 · Part-time · Hybrid',
        description:
          'Teaching assistant for CS1 (Python), Linux, and Object-Oriented Programming (Java) courses.',
      },
      {
        title: 'Junior Research Assistant',
        period: 'May 2025 – Aug 2025 · Full-time · On-site',
        description:
          'Developed an automated feedback email system for students in the CS1 course (Python, Matplotlib, MongoDB). Teaching assistant for courses in Python, C, game development, and Linux.',
      },
    ],
  },
  {
    organization: 'LUT University',
    location: 'Lappeenranta, South Karelia, Finland',
    period: 'May 2024 – Dec 2024',
    positions: [
      {
        title: 'Teaching Assistant',
        period: 'Sep 2024 – Dec 2024 · Part-time · Hybrid',
        description: 'Teaching assistant for the Basics of Linux course.',
      },
      {
        title: 'Junior Research Assistant',
        period: 'May 2024 – Aug 2024 · Full-time · On-site',
        description:
          'Data visualization of assignment statistics for the CS1 course. Created new programming assignments in Python.',
      },
    ],
  },
  {
    organization: 'Self-employed',
    role: 'Logger',
    type: 'Freelance',
    period: 'Sep 2019 – May 2024',
  },
];

export default career;
