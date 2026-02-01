import { AppSidebar } from "./_components/appSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-start">
      <AppSidebar />
      {children}
    </div>
  );
}
