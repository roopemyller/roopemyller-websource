/**
 * Photo type for photography gallery images.
 */
export interface Photo {
  src: string;
  alt: string;
}

/**
 * Array of photos for the photography gallery.
 * Replace with your real data.
 */
const photos: Photo[] = [
  // Add your photo objects here
  { src: "/photo1.jpg", alt: "Sunset over the mountains" },
  { src: "/photo2.jpg", alt: "City lights at night" },
  { src: "/photo3.jpg", alt: "Portrait in natural light" },
];

export default photos;
