"use client";

import { useEffect, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaSearch,
  FaRobot,
  FaFileAlt,
  FaEye,
} from "react-icons/fa";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  /* FETCH POSTS */
  async function getPosts() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  /* UPDATE STATUS */
  async function updateStatus(id, status) {
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  /* FILTER SEARCH */
  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.author?.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Manage Posts
        </h1>

        <div className="flex items-center bg-white px-4 py-3 rounded-xl shadow w-full md:w-80">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        {loading ? (
          <p className="p-6">Loading...</p>
        ) : (
          <table className="w-full min-w-[950px] text-left">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Category</th>
                <th className="p-4">AI Check</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post._id} className="border-t hover:bg-gray-50">

                  {/* TITLE */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FaFileAlt className="text-blue-500" />
                      <span className="font-medium">
                        {post.title}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">{post.author}</td>

                  <td className="p-4">{post.category}</td>

                  {/* AI CHECK */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        post.aiCheck === "Approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <FaRobot className="inline mr-1" />
                      {post.aiCheck}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-600"
                          : post.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">

                      {/* DETAILS */}
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                      >
                        <FaEye />
                      </button>

                      {/* APPROVE */}
                      {post.aiCheck === "Approved" &&
                        post.status === "Pending" && (
                          <button
                            onClick={() =>
                              updateStatus(
                                post._id,
                                "Published"
                              )
                            }
                            className="bg-green-500 text-white px-3 py-2 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        )}

                      {/* REJECT */}
                      {post.status === "Pending" && (
                        <button
                          onClick={() =>
                            updateStatus(
                              post._id,
                              "Rejected"
                            )
                          }
                          className="bg-red-500 text-white px-3 py-2 rounded-lg"
                        >
                          <FaTimes />
                        </button>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">

            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {selectedPost.title}
            </h2>

            <div className="space-y-3 text-gray-700">

              <p>
                <strong>Author:</strong>{" "}
                {selectedPost.author}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {selectedPost.category}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedPost.status}
              </p>

              <p>
                <strong>AI Check:</strong>{" "}
                {selectedPost.aiCheck}
              </p>

              <p>
                <strong>Description:</strong>
              </p>

              <div className="bg-gray-50 p-4 rounded-lg text-sm leading-7">
                {selectedPost.description}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}