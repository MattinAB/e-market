import CreateForm from "./_components/createForm";

import { redirect } from "next/navigation";

import { getUserWithRole } from "@/lib/get-user-with-role";

export default async function CreateProduct() {
  const user = await getUserWithRole();

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return <CreateForm />;
}
