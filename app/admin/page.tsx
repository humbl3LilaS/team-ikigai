import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function Admin() {
    const session = await auth();

    if (!session || session.user.role == "USER") {
        return notFound();
    }
    else {
        redirect("/admin/dashboard");
    }
}
