import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeRightRail } from "@/components/home-right-rail";
import { getAllPosts, getAllTags, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type PostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: "Post",
    };
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const [post, posts, tags] = await Promise.all([
    getPostBySlug(slug).catch(() => null),
    getAllPosts(),
    getAllTags(),
  ]);

  if (!post) {
    notFound();
  }

  const heroImage = post.heroImage ?? "/post-hero-fallback.svg";
  const updatedAt = post.updatedAt ?? post.date;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_280px]">
      <article className="space-y-8">
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={{ pathname: "/posts", query: { category: post.category } }}>{post.category}</Link>
          <span>/</span>
          <span className="breadcrumb-current">{post.title}</span>
        </nav>

        <header className="space-y-5">
          <div className="post-hero">
            <Image
              src={heroImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
            <div className="post-hero-overlay" />
            <div className="post-hero-content">
              <p className="section-eyebrow text-white/80">Post</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">
                {post.description}
              </p>
            </div>
          </div>

          <div className="post-meta-row">
            <div className="post-meta-list">
              <span>카테고리 {post.category}</span>
              <span>작성자 {siteConfig.author.name}</span>
              <span>작성일 {formatDate(post.date)}</span>
              <span>수정일 {formatDate(updatedAt)}</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        <div className="article-body">
          <div className="prose-reset article-prose">{post.content}</div>
          <div className="mt-10 border-t border-[var(--border)] pt-6">
            <p className="section-eyebrow">Tags</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={{ pathname: "/posts", query: { tag } }} className="soft-badge">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <HomeRightRail posts={posts} tags={tags} />
    </div>
  );
}
