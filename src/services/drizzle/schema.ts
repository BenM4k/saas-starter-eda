import { text, boolean, pgTable, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const statusEnum = pgEnum("status", [
  "pending",
  "in progress",
  "completed",
]);
export const subscriptionEnum = pgEnum("subscription_type", [
  "free",
  "pro",
  "team",
]);

export const users = pgTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  imageUrl: text("image_url"),
  isSubscribe: boolean("is_subscribe").default(false).notNull(),
  subscriptionType: subscriptionEnum("subscription_type")
    .default("free")
    .notNull(),
  subscriptionEnds: timestamp("subscription_ends", {
    mode: "date",
  }),
});

export const todos = pgTable("todos", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: priorityEnum("priority").default("low").notNull(),
  status: statusEnum("status").default("pending").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  dueDate: timestamp("due_date", { mode: "date" }),
  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.clerkId],
  }),
}));
