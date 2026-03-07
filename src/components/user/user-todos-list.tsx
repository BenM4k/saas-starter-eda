"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateTodoDialog } from "./create-todo-dialog";

type TodoStatus = "all" | "pending" | "in-progress" | "completed";

const initialTodos = [
  {
    id: 1,
    title: "Update documentation",
    description:
      "Review and update the API documentation for the new endpoints",
    status: "completed",
    priority: "Medium",
    dueDate: "Mar 5, 2026",
  },
  {
    id: 2,
    title: "Fix login bug",
    description:
      "Investigate and fix the authentication issue reported by users",
    status: "in-progress",
    priority: "High",
    dueDate: "Mar 6, 2026",
  },
  {
    id: 3,
    title: "Design review meeting",
    description: "Prepare materials for the weekly design review session",
    status: "pending",
    priority: "Low",
    dueDate: "Mar 8, 2026",
  },
  {
    id: 4,
    title: "API integration",
    description: "Integrate the payment gateway API with the checkout flow",
    status: "in-progress",
    priority: "High",
    dueDate: "Mar 10, 2026",
  },
  {
    id: 5,
    title: "User testing",
    description: "Conduct usability testing with the beta user group",
    status: "completed",
    priority: "Medium",
    dueDate: "Mar 4, 2026",
  },
  {
    id: 6,
    title: "Deploy to production",
    description: "Prepare and execute the production deployment for v2.0",
    status: "pending",
    priority: "High",
    dueDate: "Mar 12, 2026",
  },
];

const statusIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  completed: CheckCircle2,
  "in-progress": Clock,
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

const filterTabs: { label: string; value: TodoStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export function UserTodosList() {
  const [filter, setFilter] = useState<TodoStatus>("all");
  const [todos, setTodos] = useState(initialTodos);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Your Tasks
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 rounded-md bg-muted p-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setFilter(tab.value)}
                    className={cn(
                      "rounded px-3 py-1 text-xs font-medium transition-colors",
                      filter === tab.value
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                onClick={() => setIsCreateOpen(true)}
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No tasks found
            </div>
          ) : (
            filteredTodos.map((todo) => {
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="border-border bg-popover"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(todo.id, "pending")
                              }
                              className="gap-2 text-popover-foreground"
                            >
                              <Circle className="h-4 w-4" />
                              Set Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(todo.id, "in-progress")
                              }
                              className="gap-2 text-popover-foreground"
                            >
                              <Clock className="h-4 w-4" />
                              Set In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(todo.id, "completed")
                              }
                              className="gap-2 text-popover-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Set Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-popover-foreground">
                              <Pencil className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(todo.id)}
                              className="gap-2 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {todo.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: {todo.dueDate}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
      <CreateTodoDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
