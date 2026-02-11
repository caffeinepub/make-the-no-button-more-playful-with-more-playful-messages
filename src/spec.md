# Specification

## Summary
**Goal:** Add a shareable, human-readable URL path that includes the phrase “mujhe to tu psnd hai” (as a URL-safe slug) and make it easy to copy/share from the Valentine page.

**Planned changes:**
- Add a URL-safe slug route variant that preserves “mujhe to tu psnd hai” in the path (e.g., spaces converted to hyphens) and renders the same Valentine experience as the root route.
- Keep the existing root URL working unchanged.
- Add a UI element that displays the full shareable URL (including the custom slug) and allows the user to copy it, with all sharing/copying labels in English.

**User-visible outcome:** Users can open the Valentine page via the normal URL or via a shareable slug URL containing “mujhe to tu psnd hai”, and can copy/share that slug link directly from the page.
