import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import getMongoClient from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body?.name?.trim();
    const email = body?.email?.trim()?.toLowerCase();
    const password = body?.password;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters." }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "Account created successfully." }, { status: 201 });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
  
    return NextResponse.json(
      { message: "Failed to register user.", error: error.message },
      { status: 500 }
    );
  }
}
