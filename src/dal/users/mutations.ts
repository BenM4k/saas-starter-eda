import { Plan } from "@/constants/user";
import { db } from "@/services/drizzle/drizzle";
import { users } from "@/services/drizzle/schema";
import { eq } from "drizzle-orm";
import "server-only";

export async function updateUserPlan(plan: Plan, userId: string) {
  let subscriptionEnds, isSubscribe;
  if (plan !== "free") {
    subscriptionEnds = new Date();
    subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    isSubscribe = true;
  } else {
    ((subscriptionEnds = null), (isSubscribe = false));
  }

  const res = await db
    .update(users)
    .set({
      subscriptionType: plan,
      subscriptionEnds,
      isSubscribe,
    })
    .where(eq(users.id, userId))
    .returning();

  return res;
}
