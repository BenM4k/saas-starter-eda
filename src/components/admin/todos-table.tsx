"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const todos = [
  {
    id: 1,
    title: "Update documentation",
    status: "completed",
    priority: "Medium",
    assignee: "Sarah M.",
    dueDate: "Mar 5, 2026",
  },
  {
    id: 2,
    title: "Fix login bug",
    status: "in-progress",
    priority: "High",
    assignee: "John D.",
    dueDate: "Mar 6, 2026",
  },
  {
    id: 3,
    title: "Design review meeting",
    status: "pending",
    priority: "Low",
    assignee: "Emily R.",
    dueDate: "Mar 8, 2026",
  },
  {
    id: 4,
    title: "API integration",
    status: "in-progress",
    priority: "High",
    assignee: "Mike T.",
    dueDate: "Mar 10, 2026",
  },
  {
    id: 5,
    title: "User testing",
    status: "completed",
    priority: "Medium",
    assignee: "Lisa K.",
    dueDate: "Mar 4, 2026",
  },
  {
    id: 6,
    title: "Deploy to production",
    status: "pending",
    priority: "High",
    assignee: "Sarah M.",
    dueDate: "Mar 12, 2026",
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-success/10 text-success",
  "in-progress": "bg-warning/10 text-warning",
  pending: "bg-muted text-muted-foreground",
};

const priorityStyles: Record<string, string> = {
  High: "text-destructive",
  Medium: "text-warning",
  Low: "text-muted-foreground",
};

export function TodosTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Title</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Priority</TableHead>
            <TableHead className="text-muted-foreground">Assignee</TableHead>
            <TableHead className="text-muted-foreground">Due Date</TableHead>
            <TableHead className="w-12 text-muted-foreground"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id} className="border-border hover:bg-muted/50">
              <TableCell className="font-medium text-card-foreground">
                <Link
                  href={`/admin/todos/${todo.id}`}
                  className="hover:text-primary hover:underline"
                >
                  {todo.title}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[todo.status]}`}
                >
                  {todo.status}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`text-sm font-medium ${priorityStyles[todo.priority]}`}
                >
                  {todo.priority}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {todo.assignee}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {todo.dueDate}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border-border bg-popover"
                  >
                    <DropdownMenuItem className="gap-2 text-popover-foreground">
                      <Pencil className="h-4 w-4" />
                      Edit Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
