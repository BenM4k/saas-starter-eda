import Link from "next/link";
import {
  CheckSquare,
  Shield,
  User,
  ArrowRight,
  Webhook,
  Lock,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Show } from "@clerk/nextjs";
import { Activity } from "react";
import { currentUser } from "@clerk/nextjs/server";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <CheckSquare className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Task management,
            <br />
            <span className="text-primary">simplified.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
            TaskFlow helps teams stay organized with a clean, distraction-free
            interface. Create tasks, track progress, and collaborate
            effortlessly.
          </p>
          <Show when="signed-in">
            <DashboardLinks />
          </Show>
          <AuthButtons />
        </div>
      </section>

      <StackSection />
      <Footer />
    </div>
  );
}

async function DashboardLinks() {
  const user = await currentUser();
  const role = user?.publicMetadata.role ?? "user";

  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
      {role === "admin" && (
        <Button asChild size="lg" className="gap-2">
          <Link href="/admin">
            <Shield className="h-4 w-4" />
            Admin Dashboard
          </Link>
        </Button>
      )}
      {role === "user" && (
        <Button
          asChild
          size="lg"
          variant="outline"
          className="gap-2 border-border"
        >
          <Link href="/dashboard">
            <User className="h-4 w-4" />
            User Dashboard
          </Link>
        </Button>
      )}
    </div>
  );
}

function AuthButtons() {
  return (
    <Show when="signed-out">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mt-8">
        <Button size="lg" className="" asChild>
          <Link href="/auth/sign-up">
            Create Account <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="border-border" asChild>
          <Link href="/auth/sign-in">Log In</Link>
        </Button>
      </div>
    </Show>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">TaskFlow</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built for productivity. Designed for simplicity.
        </p>
      </div>
    </footer>
  );
}

function StackSection() {
  return (
    <section className="border-t border-border bg-card px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-primary">
          Powered By
        </p>
        <h2 className="mb-4 text-center text-2xl font-semibold text-foreground">
          Built with modern architecture
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          TaskFlow leverages industry-standard patterns to deliver a secure,
          scalable, and reliable task management experience.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Webhook className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Webhooks</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Real-time event notifications keep your systems in sync. Get
              instant updates when tasks are created, updated, or completed
              through automated webhook integrations.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">
              Role-Based Access Control
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Secure permission management ensures users only access what they
              need. Admins oversee the entire system while users manage their
              own tasks safely.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">
              Task Management
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Comprehensive task lifecycle from creation to completion. Track
              status, priority, and progress with a clean interface designed for
              productivity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
