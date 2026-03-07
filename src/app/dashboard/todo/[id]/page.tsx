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
import { ArrowLeft, Calendar, Clock, Pencil, Trash2 } from "lucide-react";
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

export default function UserTodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [status, setStatus] = useState(todoData.status);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todoData.title);
  const [description, setDescription] = useState(todoData.description);

  return (
    <DashboardLayout
      role="user"
      title="Todo Details"
      description={`Task #${id}`}
    >
      <div className="space-y-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to todos
        </Link>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-1">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-lg font-semibold text-foreground"
                />
              ) : (
                <CardTitle className="text-xl text-card-foreground">
                  {title}
                </CardTitle>
              )}
              <div className="flex items-center gap-2">
                <Badge className={statusColors[status]}>{status}</Badge>
                <Badge className={priorityColors[todoData.priority]}>
                  {todoData.priority} priority
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button variant="destructive" size="sm" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Description
              </h3>
              {isEditing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground"
                />
              ) : (
                <p className="text-card-foreground">{description}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Status
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
                  Priority
                </h3>
                <Select defaultValue={todoData.priority}>
                  <SelectTrigger className="w-full border-border bg-input text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
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

            {isEditing && (
              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
