import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - TaskFlow",
  description: "Manage todos and users",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
