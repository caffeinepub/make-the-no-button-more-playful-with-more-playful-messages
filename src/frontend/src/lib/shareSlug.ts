/**
 * Canonical URL-safe slug for the Valentine page.
 * Converts "mujhe to tu psnd hai" to a URL-friendly format.
 */
export const VALENTINE_SLUG = "mujhe-to-tu-psnd-hai";

/**
 * Check if the current pathname matches either the root or the canonical slug.
 */
export function isValidValentinePath(pathname: string): boolean {
  const normalized = pathname.replace(/^\/+|\/+$/g, ''); // trim leading/trailing slashes
  return normalized === '' || normalized === VALENTINE_SLUG;
}

/**
 * Build the canonical shareable URL with the slug.
 */
export function getShareUrl(): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/${VALENTINE_SLUG}`;
}
