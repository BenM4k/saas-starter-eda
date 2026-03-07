import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Todos - TaskFlow",
  description: "View and manage your personal tasks",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
