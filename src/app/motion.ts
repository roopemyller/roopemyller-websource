// Shared motion tuning so the easing curve and reveal timing live in one place
// instead of being copy-pasted across every section component.

/** Custom ease-out used site-wide (matches --transition-mode in App.css). */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
