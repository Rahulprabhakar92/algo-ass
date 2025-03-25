import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utility/db";
import Task from "@/models/Task";

export async function GET() {
  await connectDB();
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { title, description } = await req.json();
    if (!title) {
      return NextResponse.json({ message: "Title is require" }, { status: 400 });
    }
    const task = new Task({ title, description });
    await task.save();
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}