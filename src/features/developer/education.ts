export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
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
    degree: 'Bachelor of Science (Technology), Software Engineering',
    period: 'Aug 2022 – May 2025',
    details: ['Grade: 4.12', 'Minor: Electronics'],
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
    "Topic still open. I'd like to continue where my bachelor's thesis left off — open-source drone flight-control software — and pull it in a defence-tech direction. My bachelor's thesis was a survey; the master's should be a research contribution — something I build, test, or measure. A few directions I'm considering:",
  directions: [
    'Resilience and security of open-source flight-control software in contested environments — GPS-denial, jamming resistance, RF spoofing detection, and failsafe behavior under signal loss.',
    'GNSS-independent autonomous navigation — vision-based or inertial navigation as a module for an open-source flight-control stack, tested in simulation or on a real airframe.',
    'Swarm and low-cost expendable drone coordination, relevant to the low-cost FPV / one-way drone trend.',
    'Firmware security auditing of open-source flight-control code — attack surface and supply-chain risk analysis.',
  ],
  seekingNote:
    "I'm currently looking for a company in the defence-tech / counter-drone space that would like to take me on as a thesis worker in this area — get in touch via the contact section below if that's you.",
};

export default education;
