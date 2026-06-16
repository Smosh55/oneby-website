// Metros for programmatic local landing pages (industry x city). Keep this a
// curated list of real markets rather than every zip code, so each page carries
// genuine local intent instead of thin, duplicate doorway content.

export type City = { slug: string; name: string; state: string };

export const cities: City[] = [
  { slug: "dallas-tx", name: "Dallas", state: "TX" },
  { slug: "houston-tx", name: "Houston", state: "TX" },
  { slug: "austin-tx", name: "Austin", state: "TX" },
  { slug: "phoenix-az", name: "Phoenix", state: "AZ" },
  { slug: "atlanta-ga", name: "Atlanta", state: "GA" },
  { slug: "tampa-fl", name: "Tampa", state: "FL" },
  { slug: "charlotte-nc", name: "Charlotte", state: "NC" },
  { slug: "denver-co", name: "Denver", state: "CO" },
  { slug: "las-vegas-nv", name: "Las Vegas", state: "NV" },
  { slug: "nashville-tn", name: "Nashville", state: "TN" },
  { slug: "columbus-oh", name: "Columbus", state: "OH" },
  { slug: "charleston-sc", name: "Charleston", state: "SC" },
];

export const citiesBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));
