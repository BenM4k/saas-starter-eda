import { TodosTable } from "@/components/admin/todos-table";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function AdminTodosPage() {
  return (
    <DashboardLayout
      role="admin"
      title="Todos"
      description="View and update all tasks created by users"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <select className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
            <option value="all">All Users</option>
            <option value="sarah">Sarah M.</option>
            <option value="john">John D.</option>
            <option value="emily">Emily R.</option>
          </select>
        </div>
        <TodosTable />
      </div>
    </DashboardLayout>
  );
}
