"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  ListTodo,
  Activity,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

// Mock user data
const userData = {
  id: "u1",
  name: "Sarah Mitchell",
  email: "sarah@example.com",
  role: "user",
  status: "active",
  joinedAt: "2024-01-01",
  lastActive: "2024-01-16",
  subscription: "Pro",
};

// Mock todos for this user
const userTodos = [
  {
    id: "1",
    title: "Complete project proposal",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-20",
  },
  {
    id: "2",
    title: "Review design mockups",
    status: "completed",
    priority: "medium",
    dueDate: "2024-01-18",
  },
  {
    id: "3",
    title: "Update documentation",
    status: "pending",
    priority: "low",
    dueDate: "2024-01-25",
  },
  {
    id: "4",
    title: "Prepare presentation slides",
    status: "pending",
    priority: "medium",
    dueDate: "2024-01-22",
  },
];

// Mock activity data
const userActivity = [
  {
    action: "Created todo",
    item: "Complete project proposal",
    time: "2 hours ago",
  },
  {
    action: "Completed todo",
    item: "Review design mockups",
    time: "1 day ago",
  },
  {
    action: "Updated status",
    item: "Complete project proposal",
    time: "2 days ago",
  },
  { action: "Created todo", item: "Update documentation", time: "3 days ago" },
  { action: "Changed password", item: "", time: "5 days ago" },
];

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  "in-progress": "bg-warning/20 text-warning",
  completed: "bg-success/20 text-success",
};

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/20 text-primary",
  high: "bg-destructive/20 text-destructive",
};

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const completedTodos = userTodos.filter(
    (t) => t.status === "completed",
  ).length;
  const pendingTodos = userTodos.filter((t) => t.status === "pending").length;
  const inProgressTodos = userTodos.filter(
    (t) => t.status === "in-progress",
  ).length;

  return (
    <DashboardLayout
      role="admin"
      title="User Details"
      description={`User #${id}`}
    >
      <div className="space-y-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </Link>

        {/* User Profile Card */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-semibold text-primary">
                  {userData.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">
                    {userData.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {userData.email}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge
                      className={
                        userData.status === "active"
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {userData.status}
                    </Badge>
                    <Badge className="bg-primary/20 text-primary">
                      {userData.subscription}
                    </Badge>
                    <Badge variant="outline">{userData.role}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm sm:text-right">
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-medium text-foreground">
                    {userData.joinedAt}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Active</p>
                  <p className="font-medium text-foreground">
                    {userData.lastActive}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <ListTodo className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-card-foreground">
                  {userTodos.length}
                </p>
                <p className="text-sm text-muted-foreground">Total Todos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-success/20">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-card-foreground">
                  {completedTodos}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-warning/20">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-card-foreground">
                  {pendingTodos + inProgressTodos}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* User's Todos */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <ListTodo className="h-5 w-5" />
                Todos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userTodos.map((todo) => (
                  <Link
                    key={todo.id}
                    href={`/admin/todos/${todo.id}`}
                    className="flex items-center justify-between rounded-md border border-border bg-muted/50 p-3 transition-colors hover:bg-muted"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {todo.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${statusColors[todo.status]}`}
                        >
                          {todo.status}
                        </Badge>
                        <Badge
                          className={`text-xs ${priorityColors[todo.priority]}`}
                        >
                          {todo.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {todo.dueDate}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User's Activity */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {activity.action}
                        {activity.item && (
                          <span className="text-muted-foreground">
                            {" "}
                            - {activity.item}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
