"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegCommentDots, FaEye } from "react-icons/fa";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);

  // LIKE POST
  async function likePost() {
    try {
      const res = await fetch(`/api/posts/${post._id}/like`, {
        method: "POST",
      });

      const data = await res.json();
      setLikes(data.likes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">

      {/* IMAGE */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={post.image || "/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">

        {/* CATEGORY + DATE */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
            {post.category || "General"}
          </span>

          <span className="text-xs text-slate-500">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {/* TITLE */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 line-clamp-2 cursor-pointer text-xl font-bold text-slate-800 transition hover:text-indigo-600 dark:text-white">
            {post.title}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {post.description}
        </p>

        {/* READ MORE BUTTON */}
        <div className="mb-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Read More →
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto flex items-center gap-5 border-t pt-4 text-sm text-slate-500 dark:border-slate-700">

          {/* LIKE */}
          <button
            onClick={likePost}
            className="flex items-center gap-1 transition hover:text-red-500"
          >
            <FaHeart className="text-red-500" />
            {likes}
          </button>

          {/* COMMENTS */}
          <span className="flex items-center gap-1">
            <FaRegCommentDots />
            {post.comments?.length || 0}
          </span>

          {/* VIEWS */}
          <span className="flex items-center gap-1">
            <FaEye />
            {post.views || 0}
          </span>

        </div>
      </div>
    </article>
  );
}