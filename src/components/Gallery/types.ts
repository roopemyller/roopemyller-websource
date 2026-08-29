export interface Photo {
  src: string;
  alt: string;
  /** Intrinsic pixel dimensions — set so the browser can reserve layout space
   *  (avoids CLS as lazy images load). */
  width?: number;
  height?: number;
  category?: string;
  caption?: string;
}
