import * as z from "zod";

export const createTodoSchema = z.object({
  title: z.string(),
  description: z.string().min(20, "add a valid description"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in progress", "completed"]),
  dueDate: z.string(),
});

export const updateTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().min(20, "add a valid description"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in progress", "completed"]),
  dueDate: z.string(),
});
