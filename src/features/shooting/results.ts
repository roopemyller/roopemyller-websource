export interface CompetitionResult {
  id: string;
  discipline: string;
  division: string;
  eventName: string;
  placement: string;
  date: string;
  location?: string;
  image?: string;
  notes?: string;
}

const results: CompetitionResult[] = [
  {
    id: "2026-ek-sra-pm26-immola",
    discipline: "SRA",
    division: "OPEN",
    eventName: "E-K SRA PM26 Immola",
    placement: "3rd (96.70%)",
    date: "2026-06-06",
  },
  {
    id: "2026-orup-etela-sra-pm",
    discipline: "SRA",
    division: "OPEN",
    eventName: "ORUP Etelä SRA PM 2026",
    placement: "4th (89.30%)",
    date: "2026-05-31",
  },
  {
    id: "2025-operaatio-iltahamara",
    discipline: "SRA",
    division: "OPEN",
    eventName: "Operaatio Iltahämärä",
    placement: "2nd (97.04%)",
    date: "2025-10-24",
  },
  {
    id: "2025-mil-le25-toimarit",
    discipline: "SRA",
    division: "OPEN",
    eventName: "MIL/LE25 Toimarit",
    placement: "4th (72.08%)",
    date: "2025-08-08",
  },
  {
    id: "2025-sra-sm",
    discipline: "SRA",
    division: "OPEN",
    eventName: "SRA SM 2025",
    placement: "155th (62.37%)",
    date: "2025-07-19",
    notes: "Finnish SRA Championships",
  },
  {
    id: "2025-ek-sra-pm25",
    discipline: "SRA",
    division: "OPEN",
    eventName: "E-K SRA PM25",
    placement: "11th (74.02%)",
    date: "2025-06-01",
  },
  {
    id: "2025-orup-sm-karsinta",
    discipline: "SRA",
    division: "OPEN",
    eventName: "ORUP SM-Karsinta 2025",
    placement: "5th (84.53%)",
    date: "2025-05-25",
  },
];

export default results;
