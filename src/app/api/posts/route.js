import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import getMongoClient from "@/lib/mongodb";

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET /api/posts — fetch published posts (optionally filter by type or search)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const client = await getMongoClient();
    const db = client.db();

    const query = { status: "Published" };
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const posts = await db
      .collection("posts")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/posts — create a new post
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

    if (!title || !category || !type) {
      return NextResponse.json(
        { message: "Title, category, and type are required." },
        { status: 400 }
      );
    }

    const client = await getMongoClient();
    const db = client.db();

    // Admins publish immediately; regular users go to Pending
    const status = session.user.role === "admin" ? "Published" : "Pending";

    const post = {
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
      status,
      likes: 0,
      views: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("posts").insertOne(post);

    return NextResponse.json({ ...post, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Creation Error:", error);
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}
