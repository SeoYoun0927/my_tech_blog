import { HomeRightRail } from "@/components/home-right-rail";
import { MiniGameHero } from "@/components/mini-game-hero";
import { MiniPostGrid } from "@/components/mini-post-grid";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default async function Home() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);
  const thumbPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-10">
        <MiniGameHero />
        <MiniPostGrid posts={thumbPosts} />

        <section className="space-y-5">
          <div className="px-1">
            <p className="section-eyebrow">Recent Posts</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">최근 글</h2>
          </div>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>

      <HomeRightRail posts={posts} tags={tags} />
    </div>
  );
}
