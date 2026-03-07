import "server-only";
import { connectedUserId } from "../todos/queries";
import { db } from "@/services/drizzle/drizzle";
import { users } from "@/services/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getUserSubscription() {
  const userId = await connectedUserId();

  const subscription = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1)
    .then((res) => {
      return {
        ends: res[0].subscriptionEnds,
        isSubscribed: res[0].isSubscribe,
      };
    });

  if (subscription.ends && subscription.ends < new Date()) {
    await db
      .update(users)
      .set({
        subscriptionEnds: null,
        isSubscribe: false,
      })
      .where(eq(users.clerkId, userId));

    return {
      ends: null,
      isSubscribed: false,
    };
  }

  return subscription;
}
