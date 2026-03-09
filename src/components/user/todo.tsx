"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Todos, updateTodoSchemaType } from "@/types/todos";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "@/components/auth/formfield";
import { updateTodoSchema } from "@/schemas/todos";
import { deleteTodoAction, updateTodoAction } from "@/actions/todos.action";
import { toast } from "sonner";

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
export default function Todo({ todoData }: { todoData: Todos[number] }) {
  const searchParams = useSearchParams();
  const editTerm = searchParams.get("editing");
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(editTerm ? true : false);
  const router = useRouter();

  const form = useForm<updateTodoSchemaType>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      description: todoData.description,
      dueDate: new Date(todoData.dueDate ?? "").toISOString().split("T")[0],
      id: todoData.id,
      priority: todoData.priority,
      status: todoData.status,
      title: todoData.title,
    },
  });

  const handleUpdate = form.handleSubmit((values) => {
    startTransition(async () => {
      const res = await updateTodoAction(values);

      if (!res.data) {
        toast.error(res.message);
        return;
      } else {
        toast.success(res.message);
        setIsEditing(false);
        router.refresh();
      }
    });
  });

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to todos
      </Link>

      <form onSubmit={handleUpdate}>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="space-y-1">
              {isEditing ? (
                <CustomFormField
                  control={form.control}
                  name="title"
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-lg font-semibold text-foreground"
                />
              ) : (
                <CardTitle className="text-xl text-card-foreground">
                  {todoData.title}
                </CardTitle>
              )}
              <div className="flex items-center gap-2">
                <Badge className={statusColors[todoData.status]}>
                  {todoData.status}
                </Badge>
                <Badge className={priorityColors[todoData.priority]}>
                  {todoData.priority} priority
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="gap-2"
                disabled={isDeleting}
                onClick={() =>
                  startDeleteTransition(async () => {
                    const res = await deleteTodoAction(todoData.id);
                    if (!res.data) {
                      toast.error(res.message);
                      return;
                    } else {
                      toast.success(res.message);
                      router.push("/dashboard", { scroll: false });
                    }
                  })
                }
              >
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
                <CustomFormField
                  control={form.control}
                  name="description"
                  rows={8}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground"
                  fieldType="textarea"
                />
              ) : (
                <p className="text-card-foreground">{todoData.description}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Status
                </h3>
                <CustomFormField
                  control={form.control}
                  name="status"
                  disabled={!isEditing}
                  fieldType="select"
                  selectOptions={[
                    { name: "Pending", value: "pending" },
                    { name: "In progress", value: "in progress" },
                    { name: "Completed", value: "completed" },
                  ]}
                />
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Priority
                </h3>
                <CustomFormField
                  control={form.control}
                  name="priority"
                  fieldType="select"
                  disabled={!isEditing}
                  selectOptions={[
                    { name: "Low", value: "low" },
                    { name: "Medium", value: "medium" },
                    { name: "High", value: "high" },
                  ]}
                />
              </div>
            </div>

            <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Created:{" "}
                  {todoData?.createdAt &&
                    new Date(todoData.createdAt).toDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isEditing ? (
                  <CustomFormField
                    control={form.control}
                    name="dueDate"
                    type="date"
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-lg font-semibold text-foreground"
                  />
                ) : (
                  <>
                    <Clock className="h-4 w-4" />
                    <span>
                      Due:{" "}
                      {todoData?.dueDate &&
                        new Date(todoData.dueDate).toDateString()}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  Updated:{" "}
                  {todoData.updatedAt &&
                    new Date(todoData.updatedAt).toDateString()}
                </span>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
