import { redirect } from "next/navigation";
import { getUserWithRole } from "@/lib/get-user-with-role";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileClient } from "./_components/profile-client";
import { User, Mail, Shield } from "lucide-react";

export default async function ProfilePage() {
  const user = await getUserWithRole();
  if (!user) {
    redirect("/auth?callbackUrl=/profile");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Account info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User className="size-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{user.name || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield className="size-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium capitalize">{user.role.toLowerCase().replace("_", " ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <ProfileClient />
      </div>
    </div>
  );
}
