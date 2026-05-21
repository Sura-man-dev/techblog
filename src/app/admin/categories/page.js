"use client";

import { useState } from "react";
import { FaTags, FaPlus, FaSearch, FaSyncAlt, FaEdit, FaTrash, FaFolderOpen } from "react-icons/fa";

const categoryData = [
  { id: 1, name: "Technology", slug: "technology", description: "Tech news and innovation", posts: 12, created: "2026-01-05" },
  { id: 2, name: "Programming", slug: "programming", description: "Coding tutorials and tips", posts: 8, created: "2026-01-12" },
  { id: 3, name: "AI", slug: "ai", description: "Artificial Intelligence", posts: 10, created: "2026-02-01" },
  { id: 4, name: "Mobile", slug: "mobile", description: "Android and iPhone news", posts: 5, created: "2026-02-10" },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = categoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white flex items-center gap-2">
            <FaTags className="text-black/40 dark:text-white/40" />
            Categories
          </h1>
          <p className="text-sm text-black/40 dark:text-white/40 mt-1">Organize posts for better navigation.</p>
        </div>
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-black/80 dark:hover:bg-white/80 transition">
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white">{categoryData.length}</h2>
            <p className="text-sm text-black/40 dark:text-white/40">Total Categories</p>
          </div>
          <FaTags className="text-2xl text-black/30 dark:text-white/30" />
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white">{categoryData.filter((c) => c.posts > 0).length}</h2>
            <p className="text-sm text-black/40 dark:text-white/40">Categories in Use</p>
          </div>
          <FaFolderOpen className="text-2xl text-black/30 dark:text-white/30" />
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm bg-white dark:bg-black/20 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none"
          />
          <FaSearch className="absolute right-3 top-3 text-black/30 dark:text-white/30" />
        </div>
        <button onClick={() => setSearch("")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition">
          <FaSyncAlt /> Reset
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 overflow-x-auto">
        <div className="px-5 py-4 border-b border-black/10 dark:border-white/10">
          <h2 className="font-bold text-black dark:text-white">All Categories ({filtered.length})</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/10 dark:border-white/10">
            <tr>
              {["Name", "Slug", "Description", "Posts", "Created", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-black/40 dark:text-white/40">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-black/5 dark:border-white/5">
                <td className="px-4 py-3 font-medium text-black dark:text-white">{item.name}</td>
                <td className="px-4 py-3 text-black/50 dark:text-white/50">{item.slug}</td>
                <td className="px-4 py-3 text-black/50 dark:text-white/50">{item.description}</td>
                <td className="px-4 py-3">
                  <span className="border border-black/15 dark:border-white/15 px-2.5 py-0.5 rounded-full text-xs font-semibold text-black/70 dark:text-white/70">
                    {item.posts}
                  </span>
                </td>
                <td className="px-4 py-3 text-black/40 dark:text-white/40">{item.created}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition"><FaEdit /></button>
                    <button className="text-black/30 dark:text-white/30 hover:text-red-500 transition"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
