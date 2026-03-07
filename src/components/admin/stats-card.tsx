import { CheckSquare, Users, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    name: "Total Todos",
    value: "128",
    change: "+12%",
    changeType: "positive" as const,
    icon: CheckSquare,
  },
  {
    name: "Active Users",
    value: "24",
    change: "+4%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Pending Tasks",
    value: "43",
    change: "-8%",
    changeType: "negative" as const,
    icon: Clock,
  },
  {
    name: "Completed",
    value: "85",
    change: "+18%",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-card-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
