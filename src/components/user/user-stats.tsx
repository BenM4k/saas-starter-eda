import { CheckCircle, Clock, ListTodo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTodos } from "@/dal/todos/queries";
import { waitFor } from "@/lib/utils";

export async function UserStats() {
  await waitFor(3000);
  const todos = await getAllTodos("all");
  const todosInProgress = todos.filter((t) => t.status === "in progress");
  const completedTodos = todos.filter((t) => t.status === "completed");

  const stats = [
    {
      name: "Total Tasks",
      value: todos.length,
      icon: ListTodo,
    },
    {
      name: "In Progress",
      value: todosInProgress.length,
      icon: Clock,
    },
    {
      name: "Completed",
      value: completedTodos.length,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name} className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
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
