import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  industry: string; // optional industry slug linking a post to its pillar
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function fileToSlug(file: string) {
  return file.replace(/\.md$/, "");
}

function parseFile(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = fileToSlug(file);
  const title = String(data.title ?? slug);
  const excerpt = String(data.excerpt ?? "");
  return {
    slug,
    title,
    excerpt,
    date: String(data.date ?? "1970-01-01"),
    author: String(data.author ?? "OneBy Team"),
    authorRole: String(data.authorRole ?? "OneBy"),
    category: String(data.category ?? "Insights"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    industry: String(data.industry ?? ""),
    featured: Boolean(data.featured ?? false),
    seoTitle: String(data.seoTitle ?? title),
    seoDescription: String(data.seoDescription ?? excerpt),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(fileToSlug);
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return parseFile(`${slug}.md`);
}

export function getRelatedPosts(slug: string, category: string, limit = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== slug);
  const sameCat = all.filter((p) => p.category === category);
  const rest = all.filter((p) => p.category !== category);
  return [...sameCat, ...rest].slice(0, limit);
}

// Posts linked to an industry pillar, newest first. When a pillar has fewer
// than `limit` posts, fill with general (untagged) posts — which apply to every
// trade — before ever borrowing another industry's niche posts.
export function getPostsForIndustry(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const matched = all.filter((p) => p.industry === slug);
  if (matched.length >= limit) return matched.slice(0, limit);
  const general = all.filter((p) => !p.industry);
  const otherIndustry = all.filter((p) => p.industry && p.industry !== slug);
  return [...matched, ...general, ...otherIndustry].slice(0, limit);
}

// Every post tied to an industry pillar (no fill), newest first.
export function getIndustryPosts(slug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.industry === slug);
}

export function getCategories(): string[] {
  return [...new Set(getAllPosts().map((p) => p.category))];
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
