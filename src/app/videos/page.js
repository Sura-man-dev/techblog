"use client";

import { useEffect, useState } from "react";

const sidebarCategories = ["All", "AI Videos", "Web Development", "JavaScript", "DevOps"];
const popularTags = ["Next.js", "React", "AI", "TypeScript", "Node.js"];

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      try {
        const res = await fetch("/api/posts?type=video");
        const data = await res.json();
        setVideos(Array.isArray(data) ? data : []);
      } catch {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  return (
    <div className="flex gap-8">

      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:block w-[240px] shrink-0 space-y-5">

        {/* Categories */}
        <div className="glass-surface rounded-2xl p-4">
          <h3 className="text-sm font-bold mb-3 text-black dark:text-white">Categories</h3>
          <ul className="space-y-1">
            {sidebarCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${
                    activeCategory === cat
                      ? "bg-black dark:bg-white text-white dark:text-black font-semibold"
                      : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="glass-surface rounded-2xl p-4">
          <h3 className="text-sm font-bold mb-3 text-black dark:text-white">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-medium border border-black/15 dark:border-white/15 text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">Tech Videos</h1>
          <span className="text-sm text-black/40 dark:text-white/40">
            {videos.length} video{videos.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 text-black/40 dark:text-white/40">
            <p className="text-lg">No videos yet.</p>
            <p className="text-sm mt-1">Check back soon for new content.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-44 object-cover"
                  />
                ) : (
                  <div className="w-full h-44 bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <span className="text-4xl opacity-30">▶</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-black dark:text-white line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-black/40 dark:text-white/40 mt-1">
                    {video.views || 0} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
