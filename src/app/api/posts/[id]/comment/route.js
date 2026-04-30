import { NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";
import Post from "@/models/posts";

export async function POST(req, { params }) {
  const { text } = await req.json();

  const client = await getMongoClient();
  const db = client.db();

  const post = await Post.findById(params.id);

  post.comments.push({
    text,
    createdAt: new Date(),
  });

  await post.save();

  return NextResponse.json({ commentsCount: post.comments.length });
}