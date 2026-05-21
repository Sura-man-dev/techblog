"use client";

import { useEffect, useMemo, useState } from "react";
import PostCard from "@/components/PostCard";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = posts.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [posts]);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="flex min-h-screen gap-0">

      {/* LEFT SIDEBAR */}
      <aside className="hidden md:block w-56 shrink-0 border-r border-black/10 dark:border-white/10 pr-6">
        <h2 className="text-base font-bold mb-4 text-black dark:text-white">Categories</h2>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:pl-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {activeCategory === "All" ? "All Posts" : activeCategory}
          </h1>
          <span className="text-sm text-black/40 dark:text-white/40">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* MOBILE CATEGORY PILLS */}
        <div className="flex md:hidden flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                activeCategory === cat
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "border-black/20 dark:border-white/20 text-black/60 dark:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-black/40 dark:text-white/40">
            <p className="text-lg">No posts found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
