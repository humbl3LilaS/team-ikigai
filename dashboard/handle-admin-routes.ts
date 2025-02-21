import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems, TAdminRoutes } from "@/constants/ui-constants";

export async function handleAdminRoutes(route: TAdminRoutes) {
  const session = await auth();
  if (!session) redirect("/");
  const role = session?.user.role;
  const acceptRoles = adminSideBarItems.find(({ title }) => title == route);
  const isValidate = acceptRoles?.role.includes(role!);
  if (!isValidate) {
    notFound();
  }
  return session;
}