/**
 * Formats a Date (or ISO string) as e.g. "5 Aug 2026" for display in the
 * Media Library. Uses en-GB formatting to match the site's UK audience.
 */
export function formatDate(date) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
