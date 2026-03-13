"use server";

import { connectedUserId } from "@/dal/users/queries";
import { db } from "@/services/drizzle/drizzle";
import { users } from "@/services/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createSubscriptionAction() {
  const userId = await connectedUserId();
  try {
    const subscriptionEnds = new Date();
    subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);

    await db
      .update(users)
      .set({
        subscriptionEnds,
        isSubscribe: true,
      })
      .where(eq(users.clerkId, userId));

    return { ok: true, message: "Subscription updated" };
  } catch (error: any) {
    console.log(error?.message);
    return { ok: false, message: "Something went wrong" };
  }
}
