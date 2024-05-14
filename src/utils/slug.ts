// Slug generator used for share URLs and tracking codes.

export function slugify(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function trackingCode(seed: string, length = 8): string {
  const slug = slugify(seed);
  const base = (slug || "ifx").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const padded = base.padEnd(length, "X").slice(0, length);
  return padded;
}