import { redirect } from "next/navigation";
import { getUserWithRole } from "@/lib/get-user-with-role";
import { AdminSidebar } from "./_components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithRole();

  if (!user) {
    redirect("/auth");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
