"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import PostCard from "@/components/PostCard";
import { blogPosts, videoPosts, newsItems } from "@/data/content";

// All static content for client-side search
const allContent = [...blogPosts, ...videoPosts, ...newsItems];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [staticResults, setStaticResults] = useState([]);
  const [dbResults, setDbResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setStaticResults([]);
      setDbResults([]);
      return;
    }

    // Static content search (instant)
    const lower = q.toLowerCase();
    setStaticResults(
      allContent.filter(
        (item) =>
          item.title?.toLowerCase().includes(lower) ||
          item.description?.toLowerCase().includes(lower) ||
          item.category?.toLowerCase().includes(lower)
      )
    );

    // Database search
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?search=${encodeURIComponent(q)}`);
      const data = await res.json();
      setDbResults(Array.isArray(data) ? data : []);
    } catch {
      setDbResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runSearch(query);
  }, [query, runSearch]);

  const total = staticResults.length + dbResults.length;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="pb-6 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <FaSearch className="text-black/30 dark:text-white/30" />
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {query ? `"${query}"` : "Search"}
          </h1>
        </div>
        <p className="text-sm text-black/40 dark:text-white/40 ml-7">
          {!query
            ? "Type something in the search bar to find articles, videos, and news."
            : loading
            ? "Searching..."
            : `${total} result${total !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* EMPTY STATE */}
      {!query && (
        <div className="text-center py-20">
          <FaSearch className="mx-auto text-6xl text-black/8 dark:text-white/8 mb-4" />
          <p className="text-black/40 dark:text-white/40 text-sm">
            Search across all articles, videos, and news.
          </p>
        </div>
      )}

      {/* NO RESULTS */}
      {query && !loading && total === 0 && (
        <div className="text-center py-20">
          <p className="text-lg font-semibold text-black dark:text-white">
            Nothing found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-black/40 dark:text-white/40 mt-2">
            Try different keywords or browse our sections.
          </p>
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {[
              { href: "/blog", label: "Blog" },
              { href: "/videos", label: "Videos" },
              { href: "/news", label: "News" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl border border-black/15 dark:border-white/15 text-sm font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* DB RESULTS */}
      {dbResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-black dark:text-white">
            Community posts
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dbResults.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* STATIC RESULTS */}
      {staticResults.length > 0 && (
        <div className="space-y-3">
          {dbResults.length > 0 && (
            <h2 className="text-base font-bold text-black dark:text-white">
              Featured content
            </h2>
          )}
          {staticResults.map((item) => {
            const href =
              item.type === "video" ? "/videos" :
              item.type === "news" ? "/news" :
              `/blog/${item.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;

            return (
              <Link
                key={item.id}
                href={href}
                className="flex gap-4 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/3 hover:bg-black/2 dark:hover:bg-white/5 transition group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 px-2 py-0.5 rounded-full">
                      {item.type}
                    </span>
                    <span className="text-[11px] text-black/40 dark:text-white/40">{item.category}</span>
                    {item.date && (
                      <span className="text-[11px] text-black/30 dark:text-white/30">{item.date}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-black dark:text-white group-hover:text-black/70 dark:group-hover:text-white/70 transition line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black/50 dark:text-white/50 mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <span className="text-black/20 dark:text-white/20 self-center text-lg shrink-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
