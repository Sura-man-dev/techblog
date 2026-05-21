import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getMongoClient from "@/lib/mongodb";

export async function POST(req, { params }) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ message: "Comment text is required" }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db();

    const result = await db.collection("posts").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      {
        $push: {
          comments: {
            _id: new ObjectId(),
            text: text.trim(),
            createdAt: new Date(),
          },
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ commentsCount: result.comments?.length ?? 0 });
  } catch (error) {
    console.error("Comment Error:", error);
    return NextResponse.json({ message: "Failed to add comment" }, { status: 500 });
  }
}
