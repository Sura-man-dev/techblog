"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegCommentDots, FaEye } from "react-icons/fa";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);

  async function likePost() {
    try {
      const res = await fetch(`/api/posts/${post._id}/like`, { method: "POST" });
      const data = await res.json();
      setLikes(data.likes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      {/* IMAGE */}
      <div className="relative h-48 w-full overflow-hidden bg-black/5 dark:bg-white/5">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-black/20 dark:text-white/20 text-4xl">
            ✦
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">

        {/* CATEGORY + DATE */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full border border-black/15 dark:border-white/15 px-2.5 py-0.5 text-xs font-semibold text-black/70 dark:text-white/70">
            {post.category || "General"}
          </span>
          <span className="text-xs text-black/30 dark:text-white/30">
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
          </span>
        </div>

        {/* TITLE */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-base font-bold text-black dark:text-white transition hover:text-black/60 dark:hover:text-white/60">
            {post.title}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        {post.description && (
          <p className="mb-4 line-clamp-3 text-sm leading-6 text-black/50 dark:text-white/50">
            {post.description}
          </p>
        )}

        {/* READ MORE */}
        <div className="mb-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block rounded-lg border border-black/15 dark:border-white/15 px-4 py-1.5 text-xs font-semibold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Read More →
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto flex items-center gap-5 border-t border-black/5 dark:border-white/5 pt-4 text-xs text-black/40 dark:text-white/40">
          <button
            onClick={likePost}
            className="flex items-center gap-1 transition hover:text-red-500"
          >
            <FaHeart className="text-red-400" />
            {likes}
          </button>
          <span className="flex items-center gap-1">
            <FaRegCommentDots />
            {post.comments?.length || 0}
          </span>
          <span className="flex items-center gap-1">
            <FaEye />
            {post.views || 0}
          </span>
        </div>
      </div>
    </article>
  );
}
