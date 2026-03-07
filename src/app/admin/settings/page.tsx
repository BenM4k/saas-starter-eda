import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SettingsForm } from "@/components/settings/settings-form";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout
      role="admin"
      title="Settings"
      description="Manage your account settings and preferences"
    >
      <div className="mx-auto max-w-2xl">
        <SettingsForm />
      </div>
    </DashboardLayout>
  );
}
