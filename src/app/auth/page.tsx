import SigninClient from "./_components/SigninClient";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function AuthenticationPage() {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  if (session) {
    redirect("/");
  }
  return <SigninClient />;
}
