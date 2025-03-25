import mongoose, { Schema, model, models } from "mongoose";

interface ITask {
  title: string;
  description?: string;
  completed: boolean;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

const Task = models.Task || model<ITask>("Task", TaskSchema);
export default Task;