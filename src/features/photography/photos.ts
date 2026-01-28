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
  { src: "/photo1.jpg", alt: "To be added" },
];

export default photos;
