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
    <div className="space-y-16">

      {/* HERO */}
      <HeroSlider />

      {/* CATEGORIES */}
      <section className="flex flex-wrap items-center gap-2">
        {["All", ...categories].map((category, index) => (
          <button
            key={category}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              index === 0
                ? "border-indigo-400/70 bg-indigo-500/20 text-indigo-200"
                : "border-slate-300 bg-white/80 text-slate-700 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300"
            }`}
          >
            {category}
          </button>
        ))}
      </section>

      {/* FEATURED + SIDEBAR */}
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">

        {/* FEATURED POSTS */}
        <Section
          title="Featured Posts"
          subtitle="Editor picks you should not miss this week."
          action={
            <Link href="/blog" className="text-sm font-semibold text-indigo-500">
              View all
            </Link>
          }
        >
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Section>

        {/* SIDEBAR */}
        <aside className="space-y-4">

          {/* TRENDING */}
          <div className="glass-surface rounded-2xl p-5">
            <h3 className="text-lg font-semibold">Trending Posts</h3>

            <ul className="mt-4 space-y-3">
              {trendingPosts.map((title, idx) => (
                <li
                  key={title}
                  className="rounded-xl border p-3 bg-white/70 dark:bg-slate-900/70"
                >
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-slate-500">#{idx + 1} Trending</p>
                </li>
              ))}
            </ul>
          </div>

          {/* COMMUNITY STATS (REAL ICONS) */}
          <div className="glass-surface rounded-2xl p-5">
            <h3 className="text-lg font-semibold">Community Stats</h3>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

              <div className="rounded-xl border p-3 bg-white/70 dark:bg-slate-900/70">
                <FaUsers className="text-indigo-500" />
                <p className="font-bold text-lg">25.4K</p>
                <p className="text-xs">Readers</p>
              </div>

              <div className="rounded-xl border p-3 bg-white/70 dark:bg-slate-900/70">
                <FaFileAlt className="text-indigo-500" />
                <p className="font-bold text-lg">12.8K</p>
                <p className="text-xs">Posts</p>
              </div>

              <div className="rounded-xl border p-3 bg-white/70 dark:bg-slate-900/70">
                <FaVideo className="text-indigo-500" />
                <p className="font-bold text-lg">7.3K</p>
                <p className="text-xs">Videos</p>
              </div>

              <div className="rounded-xl border p-3 bg-white/70 dark:bg-slate-900/70">
                <FaUserFriends className="text-indigo-500" />
                <p className="font-bold text-lg">1.2K</p>
                <p className="text-xs">Contributors</p>
              </div>

            </div>
          </div>

        </aside>
      </section>

      {/* LATEST BLOG */}
      <Section
        title="Latest Blog Posts"
        subtitle="Fresh insights on engineering, product, and design."
        action={
          <Link href="/blog" className="text-sm font-semibold text-indigo-500">
            View all posts
          </Link>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 6).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Section>

      {/* VIDEOS */}
      <Section title="Video Highlights" subtitle="Learn visually with practical walkthroughs.">
        <div className="grid gap-6 md:grid-cols-2">
          {videoPosts.slice(0, 2).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </Section>

      {/* NEWS */}
      <Section title="News Highlights" subtitle="Important updates across the tech ecosystem.">
        <div className="grid gap-4 md:grid-cols-2">
          {newsItems.slice(0, 4).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* 📩 SUBSCRIPTION SECTION */}
      <section className="glass-surface rounded-2xl p-10 text-center">

        <h2 className="text-2xl font-bold">
          Subscribe to Tech Updates
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Get latest posts, tutorials, and news directly in your inbox.
        </p>

        <form className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-xl px-4 py-2 border dark:bg-slate-900"
          />

          <button
            type="submit"
            className="rounded-xl bg-indigo-500 px-6 py-2 text-white font-semibold"
          >
            Subscribe
          </button>
        </form>

      </section>

    </div>
  );
}