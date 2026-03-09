import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  StatsSkeleton,
  UserTodosSkeleton,
} from "@/components/skeletons/user-stats-skeleton";
import { UserStats } from "@/components/user/user-stats";
import { UserTodosList } from "@/components/user/user-todos-list";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<SearchParams>;
};
export default async function UserDashboard({ searchParams }: Props) {
  return (
    <DashboardLayout
      role="user"
      title="My Todos"
      description="View and track your assigned tasks"
    >
      <div className="space-y-6">
        <Suspense fallback={<StatsSkeleton />}>
          <UserStats />
        </Suspense>

        <Suspense fallback={<UserTodosSkeleton />}>
          <UserTodosList searchParams={searchParams} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
