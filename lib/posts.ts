import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx-components";
import { calculateReadingTime } from "@/lib/utils";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  heroImage?: string;
  featured?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

async function readPostFile(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readPostFile(slug);
      const { data, content } = matter(source);
      const frontmatter = data as PostFrontmatter;

      return {
        ...frontmatter,
        slug,
        tags: frontmatter.tags,
        readingTime: calculateReadingTime(content),
      } satisfies PostSummary;
    }),
  );

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getFeaturedPosts() {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, 3);
}

export async function getPostBySlug(slug: string) {
  const source = await readPostFile(slug);
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    ...frontmatter,
    slug,
    readingTime: calculateReadingTime(source),
    content,
  };
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export async function getArchiveGroups() {
  const posts = await getAllPosts();
  const groups = new Map<string, typeof posts>();

  for (const post of posts) {
    const date = new Date(post.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const existing = groups.get(key) ?? [];
    existing.push(post);
    groups.set(key, existing);
  }

  return [...groups.entries()]
    .map(([key, items]) => ({ key, items }))
    .sort((a, b) => b.key.localeCompare(a.key));
}
