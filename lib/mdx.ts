import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  industry?: string;
  status?: "published" | "draft";
  featured?: boolean;
  tech?: string[];
  problem?: string;
  impact?: string;
  readingTime?: string;
  slug: string;
}

export interface ContentItem {
  frontMatter: FrontMatter;
  content: string;
  slug: string;
}

export function getContentFiles(type: "projects" | "writing"): string[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getContentBySlug(type: "projects" | "writing", slug: string): ContentItem | null {
  const fullPath = path.join(CONTENT_ROOT, type, `${slug}.mdx`);
  const altPath = path.join(CONTENT_ROOT, type, `${slug}.md`);

  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(altPath) ? altPath : null;
  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const rt = readingTime(content);

  return {
    frontMatter: {
      ...(data as Omit<FrontMatter, "slug" | "readingTime">),
      slug,
      readingTime: rt.text,
    },
    content,
    slug,
  };
}

export function getAllContent(type: "projects" | "writing"): ContentItem[] {
  const files = getContentFiles(type);
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      return getContentBySlug(type, slug);
    })
    .filter(Boolean)
    .filter((item) => item!.frontMatter.status !== "draft")
    .sort((a, b) => {
      if (a!.frontMatter.featured && !b!.frontMatter.featured) return -1;
      if (!a!.frontMatter.featured && b!.frontMatter.featured) return 1;
      return new Date(b!.frontMatter.date).getTime() - new Date(a!.frontMatter.date).getTime();
    }) as ContentItem[];
}
