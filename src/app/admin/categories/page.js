"use client";

import { useState } from "react";
import {
  FaTags,
  FaPlus,
  FaSearch,
  FaSyncAlt,
  FaEdit,
  FaTrash,
  FaFolderOpen,
} from "react-icons/fa";

export default function CategoriesPage() {
  const categoryData = [
    {
      id: 1,
      name: "Technology",
      slug: "technology",
      description: "Tech news and innovation",
      posts: 12,
      created: "2026-01-05",
    },
    {
      id: 2,
      name: "Programming",
      slug: "programming",
      description: "Coding tutorials and tips",
      posts: 8,
      created: "2026-01-12",
    },
    {
      id: 3,
      name: "AI",
      slug: "ai",
      description: "Artificial Intelligence",
      posts: 10,
      created: "2026-02-01",
    },
    {
      id: 4,
      name: "Mobile",
      slug: "mobile",
      description: "Android and iPhone news",
      posts: 5,
      created: "2026-02-10",
    },
  ];

  const [search, setSearch] = useState("");

  const filtered = categoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaTags className="text-blue-600" />
            Manage Categories
          </h1>
          <p className="text-gray-500 mt-2">
            Organize posts by categories for better navigation.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <FaPlus />
          Add New Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold">{categoryData.length}</h2>
            <p className="text-gray-500">Total Categories</p>
          </div>
          <FaTags className="text-3xl text-blue-600" />
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold">
              {categoryData.filter((c) => c.posts > 0).length}
            </h2>
            <p className="text-gray-500">Categories in Use</p>
          </div>
          <FaFolderOpen className="text-3xl text-green-600" />
        </div>

      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <FaSearch />
          Search Categories
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 pr-10"
            />
            <FaSearch className="absolute right-3 top-4 text-gray-400" />
          </div>

          <button className="bg-blue-600 text-white rounded-lg px-4 py-3">
            Search
          </button>

          <button
            onClick={() => setSearch("")}
            className="bg-gray-200 rounded-lg px-4 py-3 flex items-center justify-center gap-2"
          >
            <FaSyncAlt />
            Reset
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">

        <h2 className="text-2xl font-bold mb-6">
          All Categories ({filtered.length})
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Category</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Posts</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">

                <td className="py-4 font-medium">{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.description}</td>

                <td>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {item.posts}
                  </span>
                </td>

                <td>{item.created}</td>

                <td className="flex gap-3 py-4">
                  <button className="text-blue-600">
                    <FaEdit />
                  </button>

                  <button className="text-red-600">
                    <FaTrash />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}