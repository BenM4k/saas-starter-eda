import { QuickActions } from "@/components/admin/quick-actions";
import { RecentActivity } from "@/components/admin/recent-activity";
import { StatsCards } from "@/components/admin/stats-card";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function AdminDashboard() {
  return (
    <DashboardLayout
      role="admin"
      title="Dashboard"
      description="Overview of your task management system"
    >
      <div className="space-y-6">
        <StatsCards />
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
}
