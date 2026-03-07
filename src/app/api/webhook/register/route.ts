import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { db } from "@/services/drizzle/drizzle";
import { users } from "@/services/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    // Do something with payload
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;
      const email = email_addresses?.[0]?.email_address;

      if (!email) throw new Error("User has no email");

      const newUser = await db
        .insert(users)
        .values({
          clerkId: id,
          email: email,
          imageUrl: image_url,
          firstName: first_name ?? "",
          lastName: last_name ?? "",
        })
        .onConflictDoNothing()
        .returning({ id: users.id, first_name: users.firstName });

      console.log("New user", newUser);
    }

    if (eventType === "user.updated") {
      const { id, first_name, last_name, email_addresses, image_url } =
        evt.data;
      const updatedUser = await db
        .update(users)
        .set({
          email: email_addresses[0]?.email_address ?? "",
          imageUrl: image_url,
          firstName: first_name!,
          lastName: last_name!,
        })
        .where(eq(users.clerkId, id));

      console.log("updated user", updatedUser);
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      const deletedUser = await db.delete(users).where(eq(users.clerkId, id!));

      console.log("deleted User", deletedUser);
    }
    // For this guide, log payload to console
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
