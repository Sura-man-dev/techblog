import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import getMongoClient from "@/lib/mongodb";
import Link from "next/link";
import { blogPosts } from "@/data/content";

// Try to find post from DB, fall back to static content
async function getPost(slug) {
  // Check static content first
  const staticPost = blogPosts.find((p) => {
    const s = p.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return s === slug;
  });
  if (staticPost) return { ...staticPost, _id: staticPost.id, isStatic: true };

  // Try database
  try {
    const client = await getMongoClient();
    const db = client.db();
    const post = await db.collection("posts").findOne({ slug, status: "Published" });
    return post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post Not Found | TechTalk" };
  return {
    title: `${post.title} | TechTalk`,
    description: post.description || post.content?.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const publishedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : post.date || "";

  return (
    <article className="mx-auto max-w-3xl">

      {/* BACK */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition mb-8"
      >
        ← Back to Blog
      </Link>

      {/* HEADER */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-full border border-black/15 dark:border-white/15 px-3 py-1 text-xs font-semibold text-black/70 dark:text-white/70">
            {post.category || "General"}
          </span>
          {publishedDate && (
            <span className="text-xs text-black/30 dark:text-white/30">{publishedDate}</span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-black dark:text-white">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-4 text-lg text-black/60 dark:text-white/60 leading-relaxed">
            {post.description}
          </p>
        )}

        {post.author && (
          <div className="mt-5 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-sm font-bold">
              {typeof post.author === "string" ? post.author.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              {typeof post.author === "string" ? post.author : "TechTalk"}
            </span>
          </div>
        )}
      </header>

      {/* COVER IMAGE */}
      {post.image && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
      )}

      {/* VIDEO */}
      {post.videoUrl && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <video src={post.videoUrl} controls className="w-full" />
        </div>
      )}

      {/* CONTENT */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content ? (
          <div className="text-black/80 dark:text-white/80 leading-8 text-base whitespace-pre-wrap">
            {post.content}
          </div>
        ) : (
          <p className="text-black/50 dark:text-white/50 italic">No content available for this post.</p>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
        <Link
          href="/blog"
          className="text-sm font-medium text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition"
        >
          ← All Posts
        </Link>
        <div className="flex items-center gap-2 text-sm text-black/40 dark:text-white/40">
          <span>Share:</span>
          <button className="hover:text-black dark:hover:text-white transition">X</button>
          <button className="hover:text-black dark:hover:text-white transition">LinkedIn</button>
        </div>
      </div>
    </article>
  );
}
