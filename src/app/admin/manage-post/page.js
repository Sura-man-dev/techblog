"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaSearch, FaFileAlt, FaEye } from "react-icons/fa";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getPosts(); }, []);

  async function updateStatus(id, status) {
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.author?.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-black dark:text-white">Manage Posts</h1>

        <div className="flex items-center gap-2 border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-2.5 rounded-xl w-full md:w-72">
          <FaSearch className="text-black/30 dark:text-white/30 shrink-0" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full bg-transparent text-sm text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-black/40 dark:text-white/40">Loading...</div>
        ) : (
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-black/10 dark:border-white/10">
              <tr>
                {["Title", "Author", "Category", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold text-black/50 dark:text-white/50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post._id} className="border-t border-black/5 dark:border-white/5 hover:bg-black/2 dark:hover:bg-white/2">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FaFileAlt className="text-black/30 dark:text-white/30 shrink-0" />
                      <span className="font-medium text-black dark:text-white line-clamp-1">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black/60 dark:text-white/60">{post.author}</td>
                  <td className="px-4 py-3 text-black/60 dark:text-white/60">{post.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      post.status === "Published"
                        ? "bg-black/10 dark:bg-white/10 text-black dark:text-white"
                        : post.status === "Rejected"
                        ? "bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50 line-through"
                        : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60"
                    }`}>
                      {post.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition"
                      >
                        <FaEye />
                      </button>
                      {post.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(post._id, "Published")}
                            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => updateStatus(post._id, "Rejected")}
                            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/5 transition"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DETAILS MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white text-xl transition"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white pr-8">{selectedPost.title}</h2>
            <div className="space-y-3 text-sm text-black/70 dark:text-white/70">
              <p><strong className="text-black dark:text-white">Author:</strong> {selectedPost.author}</p>
              <p><strong className="text-black dark:text-white">Category:</strong> {selectedPost.category}</p>
              <p><strong className="text-black dark:text-white">Status:</strong> {selectedPost.status}</p>
              <div>
                <p className="font-semibold text-black dark:text-white mb-2">Content:</p>
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl text-sm leading-7 max-h-60 overflow-y-auto">
                  {selectedPost.content || selectedPost.description || "No content."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
