import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { UserSettingsForm } from "@/components/settings/user-settings-form";

export default function UserSettingsPage() {
  return (
    <DashboardLayout
      role="user"
      title="Settings"
      description="Manage your account settings and subscription"
    >
      <div className="mx-auto max-w-3xl">
        <UserSettingsForm />
      </div>
    </DashboardLayout>
  );
}
