import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";


export default async function Admin() {
    const session = await auth();
    const role = session?.user.role;

    //     if (role == "ADMIN") {
    //         redirect("/admin/dashboard");
    //     }
    //     else if (role == "DRIVER") {
    //         redirect("/admin/deliveries");
    //     }
    //     else if (role == "FINANCE") {
    //         redirect("/admin/dashboard");
    //     }
    //     else if (role == "SALES") {
    //         redirect("/admin/dashboard");
    //     }
    //     else if (role == "WAREHOUSE_MANAGER") {
    //         redirect("/admin/drivers");
    //     }
    //     else if (role == "USER") {
    //         return notFound();
    //     }
    //     else {
    //         return notFound();
    //     }
    // }

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
