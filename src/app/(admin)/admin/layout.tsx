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

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isMerchant = user?.role === "MERCHANT";
  if (!isAdmin && !isMerchant) {
    redirect("/");
  }

  return (
    <AdminSidebar role={user.role} canCreateProduct={isAdmin}>
      {children}
    </AdminSidebar>
  );
}
