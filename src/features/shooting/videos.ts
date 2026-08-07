export interface VideoEntry {
  id: string; // YouTube video ID (the part after ?v= in the URL). Leave empty until you have a real one.
  title: string;
}

// Placeholder videos — fill in real YouTube video IDs when ready.
const videos: VideoEntry[] = [
  { id: "", title: "Coming Soon" },
  { id: "", title: "Coming Soon" },
];

// TODO: replace with your real YouTube channel URL
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@roopemyller";

export default videos;
