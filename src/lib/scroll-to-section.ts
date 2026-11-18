/** Smoothly scroll to an in-page section, leaving room for the fixed header. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
}
