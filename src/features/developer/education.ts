export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  badge?: string;
  details?: string[];
  thesis?: {
    title: string;
    titleEn: string;
    language: string;
    description: string;
    link?: string;
  };
}

export const education: EducationEntry[] = [
  {
    institution: 'LUT University',
    degree: 'Master of Science (Technology), Software Engineering and Digital Transformation',
    period: 'Aug 2025 – present',
    badge: 'In Progress',
    details: ['Grade: 4.73', '70/120 ECTS completed (58%)', 'Minor: Electronics'],
  },
  {
    institution: 'LUT University',
    degree: 'Bachelor of Science (Technology), Software Engineering',
    period: 'Aug 2022 – May 2025',
    details: ['Grade: 4.12', '180 ECTS', 'Minor: Electronics'],
    thesis: {
      title:
        'Dronejen avoimen lähdekoodin lennonohjausohjelmistojen nykytila ja teknologiset mahdollisuudet',
      titleEn:
        'State of the Art and Technological Opportunities of Open-Source Drone Flight Control Software',
      language: 'Written in Finnish',
      description:
        'Surveyed the state of open-source drone flight-control software — developer/user community size, development activity, and use cases — then examined the core technical features, especially autonomous flight and fault management, of the leading projects. ArduPilot, PX4, and INAV stood out for active development and broad communities, while Betaflight was the most widely used overall thanks to its FPV focus. Grade: 5.',
      link: 'https://urn.fi/URN:NBN:fi-fe20241212102046',
    },
  },
];

export const upcomingThesis = {
  period: 'Academic year 2026 – 2027',
  description:
    "Topic still open — likely building on my bachelor's thesis (open-source drone flight-control software), pushed toward defence-tech and something I actually build or test, not just survey. Directions I'm eyeing:",
  directions: [
    'GPS-denial resilience & jamming/spoofing detection for flight controllers',
    'GNSS-free navigation (vision or inertial) for autonomous flight',
    'Low-cost swarm / one-way drone coordination',
    'Firmware security auditing of flight-control code',
  ],
  seekingNote:
    "Looking for a defence-tech / counter-drone company to host this as a thesis project — get in touch via Contact below.",
};

export default education;
