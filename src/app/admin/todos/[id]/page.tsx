"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

// Mock data
const todoData = {
  id: "1",
  title: "Complete project proposal",
  description:
    "Write a detailed project proposal for the new client including timeline, budget estimates, and resource allocation. Make sure to include all relevant stakeholders and their responsibilities.",
  status: "in-progress",
  priority: "high",
  createdAt: "2024-01-15",
  dueDate: "2024-01-20",
  updatedAt: "2024-01-16",
  assignee: {
    id: "u1",
    name: "Sarah Mitchell",
    email: "sarah@example.com",
  },
};

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

export default function AdminTodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [status, setStatus] = useState(todoData.status);

  return (
    <DashboardLayout
      role="admin"
      title="Todo Details"
      description={`Task #${id}`}
    >
      <div className="space-y-6">
        <Link
          href="/admin/todos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to todos
        </Link>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl text-card-foreground">
                {todoData.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={statusColors[status]}>{status}</Badge>
                <Badge className={priorityColors[todoData.priority]}>
                  {todoData.priority} priority
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p className="text-card-foreground">{todoData.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Update Status
                </h3>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full border-border bg-input text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Assigned To
                </h3>
                <Link
                  href={`/admin/users/${todoData.assignee.id}`}
                  className="flex items-center gap-3 rounded-md border border-border bg-muted p-3 transition-colors hover:bg-muted/80"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                    {todoData.assignee.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {todoData.assignee.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {todoData.assignee.email}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created: {todoData.createdAt}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Due: {todoData.dueDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Updated: {todoData.updatedAt}</span>
              </div>
            </div>

            <div className="flex justify-end border-t border-border pt-4">
              <Button onClick={() => {}}>Save Status</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
