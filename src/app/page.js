import Link from "next/link";
import Section from "@/components/Section";
import PostCard from "@/components/PostCard";
import VideoCard from "@/components/VideoCard";
import NewsCard from "@/components/NewsCard";
import HeroSlider from "@/components/HeroSlider";
import { categories, featuredPosts, blogPosts, videoPosts, newsItems } from "@/data/content";
import { FaUsers, FaFileAlt, FaVideo, FaUserFriends } from "react-icons/fa";

const trendingPosts = [
  "Building a Real-time Chat App with WebSockets",
  "Understanding TypeScript Generics by Building Projects",
  "Deploying Next.js Apps to Vercel: A Complete Guide",
  "How I Built My Dev Portfolio with Astro",
];

export default function Home() {
  return (
    <div>

      {/* HERO — no top margin, flush */}
      <HeroSlider />

      {/* CATEGORIES */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {["All", ...categories].map((category, index) => (
          <button
            key={category}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              index === 0
                ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                : "border-black/15 dark:border-white/15 text-black/60 dark:text-white/60 hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FEATURED + SIDEBAR */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_300px]">

        <Section
          title="Featured Posts"
          subtitle="Editor picks you should not miss this week."
          action={
            <Link href="/blog" className="text-sm font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition">
              View all →
            </Link>
          }
        >
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Section>

        <aside className="space-y-4">
          {/* TRENDING */}
          <div className="glass-surface rounded-2xl p-5">
            <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wide">Trending</h3>
            <ul className="mt-3 space-y-2">
              {trendingPosts.map((title, idx) => (
                <li key={title} className="rounded-xl border border-black/8 dark:border-white/8 p-3 bg-white/50 dark:bg-black/30">
                  <p className="text-xs font-medium text-black dark:text-white line-clamp-2">{title}</p>
                  <p className="text-[11px] text-black/30 dark:text-white/30 mt-0.5">#{idx + 1} Trending</p>
                </li>
              ))}
            </ul>
          </div>

          {/* COMMUNITY STATS */}
          <div className="glass-surface rounded-2xl p-5">
            <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wide">Community</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { icon: <FaUsers />, value: "25.4K", label: "Readers" },
                { icon: <FaFileAlt />, value: "12.8K", label: "Posts" },
                { icon: <FaVideo />, value: "7.3K", label: "Videos" },
                { icon: <FaUserFriends />, value: "1.2K", label: "Contributors" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-black/8 dark:border-white/8 p-3 bg-white/50 dark:bg-black/30">
                  <div className="text-black/30 dark:text-white/30 text-sm">{stat.icon}</div>
                  <p className="font-bold text-base text-black dark:text-white mt-1">{stat.value}</p>
                  <p className="text-[11px] text-black/40 dark:text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* LATEST BLOG */}
      <div className="mt-14">
        <Section
          title="Latest Blog Posts"
          subtitle="Fresh insights on engineering, product, and design."
          action={
            <Link href="/blog" className="text-sm font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition">
              View all →
            </Link>
          }
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Section>
      </div>

      {/* VIDEOS */}
      <div className="mt-14">
        <Section title="Video Highlights" subtitle="Learn visually with practical walkthroughs.">
          <div className="grid gap-6 md:grid-cols-2">
            {videoPosts.slice(0, 2).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </Section>
      </div>

      {/* NEWS */}
      <div className="mt-14">
        <Section title="News Highlights" subtitle="Important updates across the tech ecosystem.">
          <div className="grid gap-4 md:grid-cols-2">
            {newsItems.slice(0, 4).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </Section>
      </div>

      {/* NEWSLETTER */}
      <div className="mt-14">
        <div className="glass-surface rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white">Stay in the loop</h2>
          <p className="mt-2 text-sm text-black/50 dark:text-white/50">
            Get the latest posts, tutorials, and news directly in your inbox.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-4 py-2.5 border border-black/15 dark:border-white/15 bg-white dark:bg-black/30 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none focus:border-black/30 dark:focus:border-white/30 transition text-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-black dark:bg-white px-6 py-2.5 text-sm font-semibold text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
