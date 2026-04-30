import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import connectDB from "@/lib/mongodb";
import Post from "@/models/posts";

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const title = body?.title?.trim();
    const category = body?.category?.trim();
    const type = body?.type;

    // Validate early
    if (!title || !category || !type) {
      return NextResponse.json(
        { message: "Title, category, and type are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const post = await Post.create({
      title,
      slug: slugify(title),
      category,
      content: body.content?.trim() || "",
      description: body.description || "",
      type,
      image: body.image || "",
      videoUrl: body.videoUrl || "",
      thumbnail: body.thumbnail || "",
      author: session.user.id, 
      likes: 0,
      views: 0,
      comments: [],
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Creation Error:", error);
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}
