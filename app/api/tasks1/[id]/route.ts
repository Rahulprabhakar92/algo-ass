import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utility/db";
import Task from "@/models/Task";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  try {
    const  { id } = context.params;
    const { title, description, completed } = await req.json();
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context:{ params: { id: string } }) {
  await connectDB();
  try {
    const { id } =context.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}