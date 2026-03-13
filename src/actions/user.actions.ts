"use server";

import { Plan } from "@/constants/user";
import { updateUserPlan } from "@/dal/users/mutations";
import { connectedUserId, getCurrentUserId } from "@/dal/users/queries";

export async function updateUserPlanAction(plan: Plan) {
  if (!plan) return { data: null, message: "plan needed" };

  try {
    const clerkId = await connectedUserId();
    const userId = await getCurrentUserId(clerkId);

    const res = await updateUserPlan(plan, userId);
    return { data: res, message: "Plan updated" };
  } catch (error) {
    console.error(error);
    return { data: null, message: "something went wrong" };
  }
}
