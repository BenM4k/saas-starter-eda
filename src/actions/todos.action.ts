"use server";

import {
  createTodo,
  deleteTodo,
  updateTaskStatus,
  updateTodo,
} from "@/dal/todos/mutations";
import { checkOwnership } from "@/dal/todos/queries";
import { connectedUserId, getCurrentUserId } from "@/dal/users/queries";
import { createTodoSchema, updateTodoSchema } from "@/schemas/todos";
import { createTodoSchemaType, updateTodoSchemaType } from "@/types/todos";
import { currentUser } from "@clerk/nextjs/server";

export async function createTodoAction(values: createTodoSchemaType) {
  const { data, success } = createTodoSchema.safeParse(values);

  if (!success) return { data: null, message: "Invalid inputs" };

  try {
    const clerkId = await connectedUserId();
    const userId = await getCurrentUserId(clerkId);

    const newTodo = await createTodo(data, userId);

    return { data: newTodo, message: "Task created successfully" };
  } catch (err) {
    console.error(err);
    return { data: null, message: "Something went wrong" };
  }
}

export async function updateTodoAction(values: updateTodoSchemaType) {
  const { success, data } = updateTodoSchema.safeParse(values);
  if (!success) return { data: null, message: "Invalid inputs" };

  try {
    const user = await currentUser();
    const clerkId = await connectedUserId();
    const userId = await getCurrentUserId(clerkId);

    const isOwner = await checkOwnership(userId, data.id);
    const isAdmin = user?.publicMetadata?.role === "admin";
    const canUpdate = isOwner || isAdmin;

    if (!canUpdate) {
      return { data: null, message: "Not allowed to update this task" };
    }

    const res = await updateTodo(data);
    return { data: res, message: "Task updated" };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Something went wrong" };
  }
}

export async function updateTaskStatusAction(
  status: "pending" | "in progress" | "completed",
  id: string,
) {
  if (!status || !id)
    return { data: null, message: "Missing status or task id" };
  try {
    const user = await currentUser();
    const clerkId = await connectedUserId();
    const userId = await getCurrentUserId(clerkId);

    const isOwner = await checkOwnership(userId, id);
    const isAdmin = user?.publicMetadata?.role === "admin";
    const canUpdate = isOwner || isAdmin;

    if (!canUpdate) {
      return { data: null, message: "Not allowed to update this task" };
    }

    const res = await updateTaskStatus(status, id);

    return { data: res, message: "Task status updated" };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Something went wrong" };
  }
}

export async function deleteTodoAction(id: string) {
  try {
    const user = await currentUser();
    const clerkId = await connectedUserId();
    const userId = await getCurrentUserId(clerkId);

    const isOwner = await checkOwnership(userId, id);
    const isAdmin = user?.publicMetadata?.role === "admin";
    const canDelete = isOwner || isAdmin;

    if (!canDelete) {
      return { data: null, message: "Not allowed to delete this task" };
    }

    const res = await deleteTodo(id);
    return { data: res, message: "Task deleted" };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Something went wrong" };
  }
}
