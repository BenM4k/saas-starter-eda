import "server-only";
import { db } from "@/services/drizzle/drizzle";
import { users } from "@/services/drizzle/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function existingUser({ clerkId }: { clerkId: string }) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1)
    .then((res) => res.length > 0);
  return user;
}

export async function connectedUserId() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) throw new Error("Unauthenticated");
  const userExists = await existingUser({ clerkId: userId });

  if (!userExists) {
    throw new Error("Invalid user");
  }

  return userId;
}

export async function getCurrentUserId(clerkId: string) {
  const userId = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1)
    .then((res) => res[0].id);

  return userId;
}
