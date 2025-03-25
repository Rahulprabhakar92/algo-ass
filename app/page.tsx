"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { Toaster, toast } from "sonner";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      setTitle("");
      setDescription("");
      fetchTasks();
      toast.success("Task added successfully");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/tasks1/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks1/${id}`, { method: "DELETE" });
      fetchTasks();
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Toaster />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
              className="flex-grow"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </form>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div 
                key={task._id} 
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  task.completed ? 'bg-gray-100 line-through' : ''
                }`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleComplete(task._id, task.completed)}
                />
                <div className="flex-grow">
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-gray-500">{task.description}</div>
                  )}
                </div>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => deleteTask(task._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}