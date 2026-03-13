CREATE TYPE "public"."subscription_type" AS ENUM('free', 'pro', 'team');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_type" "subscription_type" DEFAULT 'free';