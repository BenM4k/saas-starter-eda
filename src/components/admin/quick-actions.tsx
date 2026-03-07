import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus, FileText, Settings } from "lucide-react";

const actions = [
  {
    name: "Create Todo",
    description: "Add a new task to the system",
    icon: Plus,
    href: "/admin/todos",
  },
  {
    name: "Add User",
    description: "Invite a new team member",
    icon: UserPlus,
    href: "/admin/users",
  },
  {
    name: "View Reports",
    description: "Check productivity analytics",
    icon: FileText,
    href: "/admin",
  },
  {
    name: "Settings",
    description: "Configure system preferences",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function QuickActions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-card-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link key={action.name} href={action.href}>
            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start gap-1 border-border bg-muted p-4 text-left hover:bg-secondary"
            >
              <div className="flex items-center gap-2">
                <action.icon className="h-4 w-4 text-primary" />
                <span className="font-medium text-card-foreground">
                  {action.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
