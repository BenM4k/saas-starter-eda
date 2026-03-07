import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    user: "Sarah M.",
    action: "completed",
    task: "Update documentation",
    time: "2 min ago",
  },
  {
    id: 2,
    user: "John D.",
    action: "created",
    task: "Fix login bug",
    time: "15 min ago",
  },
  {
    id: 3,
    user: "Emily R.",
    action: "updated",
    task: "Design review meeting",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "Mike T.",
    action: "assigned",
    task: "API integration",
    time: "2 hours ago",
  },
  {
    id: 5,
    user: "Lisa K.",
    action: "completed",
    task: "User testing",
    time: "3 hours ago",
  },
];

const actionColors: Record<string, string> = {
  completed: "text-success",
  created: "text-primary",
  updated: "text-warning",
  assigned: "text-muted-foreground",
};

export function RecentActivity() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-card-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                {activity.user.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-card-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className={actionColors[activity.action]}>
                    {activity.action}
                  </span>{" "}
                  <span className="text-muted-foreground">{activity.task}</span>
                </p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {activity.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
