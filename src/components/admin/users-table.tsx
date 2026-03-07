"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2, Shield, Eye } from "lucide-react";
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

const users = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    role: "Admin",
    status: "active",
    todos: 12,
    joinedAt: "Jan 15, 2026",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "active",
    todos: 8,
    joinedAt: "Feb 3, 2026",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "User",
    status: "active",
    todos: 15,
    joinedAt: "Feb 10, 2026",
  },
  {
    id: 4,
    name: "Mike Thompson",
    email: "mike@example.com",
    role: "User",
    status: "inactive",
    todos: 4,
    joinedAt: "Feb 20, 2026",
  },
  {
    id: 5,
    name: "Lisa Kim",
    email: "lisa@example.com",
    role: "User",
    status: "active",
    todos: 22,
    joinedAt: "Mar 1, 2026",
  },
];

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
};

const roleStyles: Record<string, string> = {
  Admin: "bg-primary/10 text-primary",
  User: "bg-secondary text-secondary-foreground",
};

export function UsersTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">User</TableHead>
            <TableHead className="text-muted-foreground">Role</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Todos</TableHead>
            <TableHead className="text-muted-foreground">Joined</TableHead>
            <TableHead className="w-12 text-muted-foreground"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-border hover:bg-muted/50">
              <TableCell>
                <Link
                  href={`/admin/users/${user.id}`}
                  className="flex items-center gap-3 hover:opacity-80"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground hover:text-primary">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${roleStyles[user.role]}`}
                >
                  {user.role === "Admin" && <Shield className="h-3 w-3" />}
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[user.status]}`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.todos}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.joinedAt}
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
                    <DropdownMenuItem
                      asChild
                      className="gap-2 text-popover-foreground"
                    >
                      <Link href={`/admin/users/${user.id}`}>
                        <Eye className="h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-popover-foreground">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
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
