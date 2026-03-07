"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { UsersTable } from "@/components/admin/users-table";
import { CreateUserDialog } from "@/components/admin/create-user-dialog";

export default function AdminUsersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <DashboardLayout
      role="admin"
      title="Users"
      description="Manage team members and permissions"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
        <UsersTable />
        <CreateUserDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      </div>
    </DashboardLayout>
  );
}
