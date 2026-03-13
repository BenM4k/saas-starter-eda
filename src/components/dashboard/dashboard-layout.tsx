"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CheckSquare,
  LogOut,
  Settings,
  ChevronDown,
  Loader,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminLinks, userLinks } from "@/constants/dashboard";
import { useClerk, useUser } from "@clerk/nextjs";
import { useTransition } from "react";
import { ModeToggle } from "../mode-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "admin" | "user";
  title: string;
  description?: string;
}

export function DashboardLayout({
  children,
  role,
  title,
  description,
}: DashboardLayoutProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const settingsPath =
    role === "admin" ? "/admin/settings" : "/dashboard/settings";

  const links = role === "admin" ? adminLinks : userLinks;
  const { user } = useUser();
  const firstName = user?.firstName ?? "Custom";
  const lastName = user?.lastName ?? "User";
  const initials = firstName[0] + lastName[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <CheckSquare className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">
                  TaskFlow
                </span>
              </Link>

              <nav className="flex items-center gap-1">
                {links.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                    {role === "admin" ? "Admin" : initials}
                  </div>
                  <span className="hidden sm:block">
                    {role === "admin"
                      ? "Admin"
                      : `${user?.firstName} ${user?.lastName}`}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-border bg-popover"
                >
                  <DropdownMenuItem
                    asChild
                    className="gap-2 text-popover-foreground"
                  >
                    <Link href={settingsPath}>
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    className="gap-2 text-destructive"
                    onClick={() =>
                      startTransition(() => {
                        signOut({ redirectUrl: "/" });
                      })
                    }
                  >
                    {isPending ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      <>
                        <LogOut className="h-4 w-4" />

                        <span>Logout</span>
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
