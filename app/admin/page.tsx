import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";


export default async function Admin() {
    const session = await auth();
    const role = session?.user.role;

    switch (role) {
        case "ADMIN":
            redirect("/admin/dashboard");
        case "DRIVER":
            redirect("/admin/deliveries");
        case "FINANCE":
            redirect("/admin/dashboard");
        case "SALES":
            redirect("/admin/dashboard");
        case "WAREHOUSE_MANAGER":
            redirect("/admin/drivers");
        case "USER":
            return notFound();
    }
}
