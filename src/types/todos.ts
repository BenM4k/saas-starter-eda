import * as z from "zod";
import { createTodoSchema, updateTodoSchema } from "@/schemas/todos";

export type createTodoSchemaType = z.infer<typeof createTodoSchema>;
export type updateTodoSchemaType = z.infer<typeof updateTodoSchema>;

export type Todos = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed" | "in progress";
  userId: string;
  dueDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}[];

export type TodoStatus = "all" | "pending" | "in progress" | "completed";
