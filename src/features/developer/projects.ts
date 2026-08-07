export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "roopemyller-websource",
    description:
      "Vibe coded with Claude Code, Website for me, my photography portfolio and shooting sports page. Built with React, TypeScript, and Framer Motion.",
    image:
      "https://opengraph.githubassets.com/1/roopemyller/roopemyller-websource",
    link: "https://github.com/roopemyller/roopemyller-websource",
  },
  {
    title: "movie-decider",
    description:
      "React Application for a Hackathon. Project idea: Movie Decider",
    image: "https://opengraph.githubassets.com/1/Jepunen/movie-decider",
    link: "https://github.com/Jepunen/movie-decider",
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
