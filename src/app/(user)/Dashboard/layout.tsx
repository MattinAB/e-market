import { AppSidebar } from "./_components/appSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppSidebar>{children}</AppSidebar>;
}
