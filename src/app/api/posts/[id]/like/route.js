import { NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";
import Post from "@/models/posts";

export async function POST(req, { params }) {
    const client = await getMongoClient();
    const db = client.db();

  const post = await Post.findById(params.id);
  post.likes += 1;
  await post.save();

  return NextResponse.json({ likes: post.likes });
}