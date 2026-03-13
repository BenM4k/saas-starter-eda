import { db } from "@/services/drizzle/drizzle";
import { todos } from "@/services/drizzle/schema";
import { createTodoSchemaType, updateTodoSchemaType } from "@/types/todos";
import { eq } from "drizzle-orm";
import "server-only";

export async function createTodo(values: createTodoSchemaType, userId: string) {
  const { description, dueDate, priority, status, title } = values;
  return await db
    .insert(todos)
    .values({
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      status,
      userId,
    })
    .returning()
    .then((res) => ({ id: res[0].id, title: res[0].title }));
}

export async function updateTodo(data: updateTodoSchemaType) {
  const { id, description, dueDate, priority, status, title } = data;
  const formattedDueDate = new Date(dueDate);
  const updatedAt = new Date();
  const res = await db
    .update(todos)
    .set({
      description,
      dueDate: formattedDueDate,
      priority,
      status,
      title,
      updatedAt,
    })
    .where(eq(todos.id, id))
    .returning();
  return res[0];
}

export async function updateTaskStatus(
  status: "pending" | "in progress" | "completed",
  id: string,
) {
  const res = await db
    .update(todos)
    .set({ status })
    .where(eq(todos.id, id))
    .returning();

  return res[0];
}

export async function deleteTodo(id: string) {
  return await db.delete(todos).where(eq(todos.id, id)).returning();
}
