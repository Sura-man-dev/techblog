import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getMongoClient from "@/lib/mongodb";

export async function POST(req, { params }) {
  try {
    const client = await getMongoClient();
    const db = client.db();

    const result = await db.collection("posts").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $inc: { likes: 1 } },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ likes: result.likes ?? 0 });
  } catch (error) {
    console.error("Like Error:", error);
    return NextResponse.json({ message: "Failed to like post" }, { status: 500 });
  }
}
