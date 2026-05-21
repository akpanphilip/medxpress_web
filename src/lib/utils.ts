// Small utilities shared across the app.

/** Join class names, keeping only non-empty strings. */
export function cn(...parts: unknown[]): string {
  return parts
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .join(" ");
}

/** Format a number as Nigerian Naira (the platform's default currency). */
export function formatMoney(amount: number): string {
  return "N" + amount.toLocaleString("en-NG");
}

/** Build initials from a full name, e.g. "Ada Obi" -> "AO". */
export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** Deterministic warm gradient for an avatar fallback, seeded by a string. */
export function avatarGradient(seed: string): string {
  const palettes = [
    "from-sky to-sky-600",
    "from-[#5ec7ff] to-[#1f9fe8]",
    "from-[#7a8cff] to-[#4f63d8]",
    "from-amber to-red",
    "from-online to-[#16a34a]",
    "from-[#ff8a5b] to-red",
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return palettes[Math.abs(h) % palettes.length];
}

/** Title-case a role for display. */
export function roleLabel(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

/** The landing route for each role after signing in. */
export function homeFor(role: string): string {
  if (role === "doctor") return "/doctor";
  if (role === "admin") return "/admin";
  return "/dashboard";
}

// Verified, full-resolution photographs of Black / African people, each one
// hand-checked by visual review. "p:N" = a pravatar portrait; "u:ID" = an
// Unsplash photo. Both sources serve sharp images. Gender is inferred from
// the person's name so portraits roughly match.
const FACES_MEN = [
  "p:7",
  "p:17",
  "p:18",
  "p:51",
  "u:1506277886164-e25aa3f4ef7f",
  "u:1666214280557-f1b5022eb634",
  "u:1622253692010-333f2da6031d",
  "u:1633332755192-727a05c4013d",
];

const FACES_WOMEN = [
  "p:16",
  "p:38",
  "p:41",
  "u:1531123897727-8f129e1688ce",
];

const FEMALE_NAMES = new Set([
  "adaeze", "fatima", "chidinma", "aisha", "amara", "grace", "ngozi",
  "halima", "blessing", "chioma", "ifeoma", "zainab", "ada", "amina",
]);

function seedHash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function faceUrl(token: string): string {
  const size = 640;
  if (token.startsWith("p:")) {
    return `https://i.pravatar.cc/${size}?img=${token.slice(2)}`;
  }
  return `https://images.unsplash.com/photo-${token.slice(2)}?w=${size}&h=${size}&fit=crop&crop=faces&auto=format&q=80`;
}

/** A sharp, verified photo of a Black / African person, seeded by name. */
export function personAvatar(seed: string): string {
  const first =
    seed.replace(/^dr\.?\s+/i, "").trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  const pool = FEMALE_NAMES.has(first) ? FACES_WOMEN : FACES_MEN;
  return faceUrl(pool[seedHash(seed) % pool.length]);
}

/** Alias kept for cover and profile imagery. */
export const personPortrait = personAvatar;
