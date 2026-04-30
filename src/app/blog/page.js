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
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
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
    <div className="min-h-screen flex bg-[#0b0f19] text-white">

      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-slate-800 p-4">
        <h2 className="text-lg font-bold mb-4">Categories</h2>

        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded ${
                activeCategory === cat
                  ? "bg-purple-600"
                  : "hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Latest Blog Posts</h1>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading posts...</p>
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