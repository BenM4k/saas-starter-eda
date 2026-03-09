import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn, waitFor } from "@/lib/utils";
import TodoListFilters from "./todo-list-filters";
import { getAllTodos } from "@/dal/todos/queries";
import { SearchParams } from "nuqs";
import { loaderFilters } from "./search-params";
import TodoQuickActions from "./todo-quick-actions";

const statusIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  completed: CheckCircle2,
  "in progress": Clock,
  pending: Circle,
};

const statusColors: Record<string, string> = {
  completed: "text-success",
  "in-progress": "text-warning",
  pending: "text-muted-foreground",
};

const priorityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-muted text-muted-foreground",
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export async function UserTodosList({ searchParams }: Props) {
  await waitFor(3000);
  const { taskStatusFilter: filter } = await loaderFilters(searchParams);
  const todos = await getAllTodos(filter);

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Your Tasks
            </CardTitle>
            <TodoListFilters filter={filter} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {todos.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No tasks found
            </div>
          ) : (
            todos.map((todo) => {
              const StatusIcon = statusIcons[todo.status];
              return (
                <div
                  key={todo.id}
                  className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4 transition-colors hover:bg-muted"
                >
                  <StatusIcon
                    className={cn("mt-0.5 h-5 w-5", statusColors[todo.status])}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/dashboard/todo/${todo.id}`}
                        className="font-medium text-card-foreground hover:text-primary"
                      >
                        {todo.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                            priorityColors[todo.priority],
                          )}
                        >
                          {todo.priority}
                        </span>
                        <TodoQuickActions id={todo.id} />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {todo.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due:{" "}
                      {todo.dueDate
                        ? new Date(todo.dueDate).toLocaleString()
                        : "No due date defined"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </>
  );
}
