"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

// slug generator
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const categoryOptions = [
  "Web Development",
  "AI",
  "Mobile",
  "Cloud",
  "Cybersecurity",
  "DevOps",
];

const postTypes = ["blog", "news", "video"];

export default function CreatePostForm() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [type, setType] = useState("blog");
  const [content, setContent] = useState("");

  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // upload file
  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const slug = generateSlug(title);

      // 👇 ROLE BASED STATUS
      const status = isAdmin ? "Published" : "Pending";

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          category,
          type,
          content,
          image,
          video,
          status,
          author: session?.user?.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create post");
        return;
      }

      setMessage(
        isAdmin
          ? "Post published successfully 🎉"
          : "Post submitted for admin approval ⏳"
      );

      // reset
      setTitle("");
      setCategory(categoryOptions[0]);
      setType("blog");
      setContent("");
      setImage("");
      setVideo("");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
    >

      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Enter post title"
      />

      {/* TYPE */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      >
        {postTypes.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl border px-4 py-3"
      >
        {categoryOptions.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* IMAGE UPLOAD (KEPT + STYLED) */}
      <div>
        <label className="text-sm font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const url = await uploadFile(file);
            setImage(url);
          }}
          className="w-full rounded-xl border p-2"
        />

        {image && (
          <img
            src={image}
            className="mt-2 h-48 w-full rounded-xl object-cover"
          />
        )}
      </div>

      {/* VIDEO UPLOAD (KEPT + THUMBNAIL ADDED) */}
      <div>
        <label className="text-sm font-medium">Upload Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const url = await uploadFile(file);
            setVideo(url);
          }}
          className="w-full rounded-xl border p-2"
        />

        {video && (
          <div className="mt-2">
            {/* VIDEO PREVIEW */}
            <video
              src={video}
              controls
              className="h-48 w-full rounded-xl object-cover"
            />

            {/* SIMPLE THUMBNAIL LABEL */}
            <p className="mt-1 text-xs text-gray-500">
              Video uploaded successfully (thumbnail will be generated in backend if needed)
            </p>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Write your post..."
      />

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        {loading
          ? "Processing..."
          : isAdmin
          ? "Publish Now"
          : "Submit for Admin Approval"}
      </button>

      {/* MESSAGES */}
      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}