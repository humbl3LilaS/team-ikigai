import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";


export default async function Admin() {
    const session = await auth();
    const role = session?.user.role;

    if (role == "ADMIN") {
        redirect("/admin/dashboard");
    }
    else if (role == "DRIVER") {
        redirect("/admin/drivers");
    }
    else if (role == "FINANCE") {
        redirect("/admin/dashboard");
    }
    else if (role == "SALES") {
        redirect("/admin/dashboard");
    }
    else if (role == "WAREHOUSE_MANAGER") {
        redirect("/admin/drivers");
    }
    else if (role == "USER") {
        return notFound();
    }
    else {
        return notFound();
    }
}
