/**
 * Project type for portfolio projects.
 */
export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

/**
 * Array of projects for the portfolio section.
 * Replace with your real data.
 */
const projects: Project[] = [
  {
    title: "movie-decider",
    description:
      "React Application for a Hackathon. Project idea: Movie Decider",
    image: "https://opengraph.githubassets.com/1/Jepunen/movie-decider",
    link: "https://github.com/Jepunen/movie-decider",
  },
  {
    title: "metsa-myller-websource",
    description: "React Website for my father's forestry business.",
    image:
      "https://opengraph.githubassets.com/1/roopemyller/metsa-myller-websource",
    link: "https://github.com/roopemyller/metsa-myller-websource",
  },
  {
    title: "kanban-react-node-AWA",
    description:
      "Kanban board app with React frontend and NodeJS backend. MongoDB database.",
    image:
      "https://opengraph.githubassets.com/1/roopemyller/kanban-react-node-AWA",
    link: "https://github.com/roopemyller/kanban-react-node-AWA",
  },
  {
    title: "cs-nurkka",
    description:
      "Prototype marketplace for CS2 game items with NextJS frontend and Postgres database.",
    image: "https://opengraph.githubassets.com/1/Jepunen/cs-nurkka",
    link: "https://github.com/Jepunen/cs-nurkka",
  },
  {
    title: "distributed-cloud-storage-project",
    description: "Distributed cloud storage project in Python.",
    image:
      "https://opengraph.githubassets.com/1/roopemyller/distributed-cloud-storage-project",
    link: "https://github.com/roopemyller/distributed-cloud-storage-project",
  },
  {
    title: "arduino-elevator",
    description: "Arduino elevator project in C.",
    image: "https://opengraph.githubassets.com/1/roopemyller/arduino-elevator",
    link: "https://github.com/roopemyller/arduino-elevator",
  },
];

export default projects;
