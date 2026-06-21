// Metros for programmatic local landing pages (industry x city). Each city
// carries real local detail (metro region, area codes, neighborhoods) so the
// pages read as genuinely local instead of thin, duplicate doorway content.

export type City = {
  slug: string;
  name: string;
  state: string;
  // A noun phrase that drops into "across {region}".
  region: string;
  // Real local calling codes, so "keep your number" feels local.
  areaCodes: string[];
  // Well-known neighborhoods and suburbs we name to show real coverage.
  neighborhoods: string[];
};

export const cities: City[] = [
  {
    slug: "dallas-tx",
    name: "Dallas",
    state: "TX",
    region: "the Dallas-Fort Worth metroplex",
    areaCodes: ["214", "469", "972"],
    neighborhoods: ["Uptown", "Oak Cliff", "Deep Ellum", "Plano", "Irving", "Frisco"],
  },
  {
    slug: "houston-tx",
    name: "Houston",
    state: "TX",
    region: "Greater Houston",
    areaCodes: ["713", "281", "832"],
    neighborhoods: ["The Heights", "Montrose", "Katy", "Sugar Land", "The Woodlands", "Pearland"],
  },
  {
    slug: "austin-tx",
    name: "Austin",
    state: "TX",
    region: "Central Texas",
    areaCodes: ["512", "737"],
    neighborhoods: ["East Austin", "South Congress", "Round Rock", "Cedar Park", "Pflugerville", "Georgetown"],
  },
  {
    slug: "phoenix-az",
    name: "Phoenix",
    state: "AZ",
    region: "the Valley of the Sun",
    areaCodes: ["602", "480", "623"],
    neighborhoods: ["Scottsdale", "Tempe", "Mesa", "Chandler", "Gilbert", "Glendale"],
  },
  {
    slug: "atlanta-ga",
    name: "Atlanta",
    state: "GA",
    region: "metro Atlanta",
    areaCodes: ["404", "678", "470"],
    neighborhoods: ["Buckhead", "Midtown", "Marietta", "Sandy Springs", "Decatur", "Alpharetta"],
  },
  {
    slug: "tampa-fl",
    name: "Tampa",
    state: "FL",
    region: "the Tampa Bay area",
    areaCodes: ["813", "727"],
    neighborhoods: ["St. Petersburg", "Clearwater", "Brandon", "Riverview", "Wesley Chapel", "Town 'n' Country"],
  },
  {
    slug: "charlotte-nc",
    name: "Charlotte",
    state: "NC",
    region: "the Charlotte metro",
    areaCodes: ["704", "980"],
    neighborhoods: ["Uptown", "South End", "Ballantyne", "Matthews", "Huntersville", "Concord"],
  },
  {
    slug: "denver-co",
    name: "Denver",
    state: "CO",
    region: "the Front Range",
    areaCodes: ["303", "720"],
    neighborhoods: ["LoDo", "Aurora", "Lakewood", "Centennial", "Highlands Ranch", "Arvada"],
  },
  {
    slug: "las-vegas-nv",
    name: "Las Vegas",
    state: "NV",
    region: "the Las Vegas Valley",
    areaCodes: ["702", "725"],
    neighborhoods: ["Henderson", "Summerlin", "North Las Vegas", "Paradise", "Spring Valley", "Enterprise"],
  },
  {
    slug: "nashville-tn",
    name: "Nashville",
    state: "TN",
    region: "Middle Tennessee",
    areaCodes: ["615", "629"],
    neighborhoods: ["East Nashville", "Germantown", "Franklin", "Brentwood", "Murfreesboro", "Hendersonville"],
  },
  {
    slug: "columbus-oh",
    name: "Columbus",
    state: "OH",
    region: "Central Ohio",
    areaCodes: ["614", "380"],
    neighborhoods: ["Dublin", "Westerville", "Hilliard", "Gahanna", "Grove City", "Worthington"],
  },
  {
    slug: "charleston-sc",
    name: "Charleston",
    state: "SC",
    region: "the Lowcountry",
    areaCodes: ["843", "854"],
    neighborhoods: ["Mount Pleasant", "North Charleston", "Summerville", "James Island", "West Ashley", "Daniel Island"],
  },
];

export const citiesBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));

// Sibling metros for internal linking on local pages: same state first, then
// fill out to `count` with other markets. Builds a real local cluster.
export function nearbyCities(slug: string, count = 4): City[] {
  const current = citiesBySlug[slug];
  if (!current) return [];
  const others = cities.filter((c) => c.slug !== slug);
  const sameState = others.filter((c) => c.state === current.state);
  const rest = others.filter((c) => c.state !== current.state);
  return [...sameState, ...rest].slice(0, count);
}
