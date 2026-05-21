"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

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

const inputClass =
  "w-full rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/30 px-4 py-3 text-sm text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none focus:border-black/40 dark:focus:border-white/40 transition";

const labelClass = "block text-sm font-medium text-black/70 dark:text-white/70 mb-1.5";

export default function CreatePostForm() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [type, setType] = useState("blog");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
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
      const status = isAdmin ? "Published" : "Pending";

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          type,
          content,
          image,
          videoUrl,
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
          ? "Post published successfully ✓"
          : "Post submitted for admin approval — pending review"
      );

      setTitle("");
      setCategory(categoryOptions[0]);
      setType("blog");
      setContent("");
      setImage("");
      setVideoUrl("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-6"
    >

      {/* TITLE */}
      <div>
        <label className={labelClass}>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
          placeholder="Enter post title"
        />
      </div>

      {/* TYPE + CATEGORY */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Post Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClass}
          >
            {postTypes.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <label className={labelClass}>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            setUploading(true);
            try {
              const url = await uploadFile(file);
              setImage(url);
            } catch {
              setError("Image upload failed. Check your Cloudinary config.");
            } finally {
              setUploading(false);
            }
          }}
          className="w-full rounded-xl border border-black/15 dark:border-white/15 p-2 text-sm text-black dark:text-white file:mr-3 file:rounded-lg file:border-0 file:bg-black/5 dark:file:bg-white/5 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-black dark:file:text-white cursor-pointer"
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-3 h-48 w-full rounded-xl object-cover border border-black/10 dark:border-white/10"
          />
        )}
      </div>

      {/* VIDEO UPLOAD */}
      <div>
        <label className={labelClass}>Video (optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            setUploading(true);
            try {
              const url = await uploadFile(file);
              setVideoUrl(url);
            } catch {
              setError("Video upload failed. Check your Cloudinary config.");
            } finally {
              setUploading(false);
            }
          }}
          className="w-full rounded-xl border border-black/15 dark:border-white/15 p-2 text-sm text-black dark:text-white file:mr-3 file:rounded-lg file:border-0 file:bg-black/5 dark:file:bg-white/5 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-black dark:file:text-white cursor-pointer"
        />
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            className="mt-3 h-48 w-full rounded-xl object-cover border border-black/10 dark:border-white/10"
          />
        )}
      </div>

      {/* CONTENT */}
      <div>
        <label className={labelClass}>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
          className={inputClass}
          placeholder="Write your post content here..."
        />
      </div>

      {uploading && (
        <p className="text-sm text-black/50 dark:text-white/50">Uploading file...</p>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full rounded-xl bg-black dark:bg-white py-3 text-sm font-semibold text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading
          ? "Processing..."
          : isAdmin
          ? "Publish Now"
          : "Submit for Review"}
      </button>

      {message && (
        <p className="text-sm text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 bg-black/5 dark:bg-white/5">
          {message}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3 bg-red-50 dark:bg-red-950/20">
          {error}
        </p>
      )}
    </form>
  );
}
