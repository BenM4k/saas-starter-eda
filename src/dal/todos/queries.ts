import "server-only";
import { db } from "@/services/drizzle/drizzle";
import { todos } from "@/services/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { connectedUserId, getCurrentUserId } from "../users/queries";
import { TodoStatus } from "@/types/todos";

export async function getAllTodos(filter: TodoStatus) {
  const clerkId = await connectedUserId();
  const userId = await getCurrentUserId(clerkId);

  const conditions = [eq(todos.userId, userId)];

  if (filter !== "all") {
    conditions.push(eq(todos.status, filter));
  }

  const userTodos = await db
    .select()
    .from(todos)
    .where(and(...conditions));

  return userTodos;
}

export async function getTodoById(id: string) {
  const clerkId = await connectedUserId();

  const todo = await db.select().from(todos).where(eq(todos.id, id));

  return todo[0];
}

export async function checkOwnership(userId: string, id: string) {
  const todo = await db.select().from(todos).where(eq(todos.id, id)).limit(1);

  return todo[0].userId === userId;
}
