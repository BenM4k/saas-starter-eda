import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { UserStats } from "@/components/user/user-stats";
import { UserTodosList } from "@/components/user/user-todos-list";

export default function UserDashboard() {
  return (
    <DashboardLayout
      role="user"
      title="My Todos"
      description="View and track your assigned tasks"
    >
      <div className="space-y-6">
        <UserStats />
        <UserTodosList />
      </div>
    </DashboardLayout>
  );
}
