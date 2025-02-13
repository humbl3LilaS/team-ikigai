import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ComplainTable from "@/features/client/user/complains/components/complain-list";
import CustomerComplaintForm from "@/features/client/user/complains/components/customer-complain-form";

export default async function ComplaintsPage() {
    const session = await auth();
    if (!session) {
        return redirect("/sign-in");
    }
    return (
        <section
            className={
                "px-6 grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-10 lg:px-20"
            }
        >
            <CustomerComplaintForm userId={session.user.id} />
            <ComplainTable />
        </section>
    );
}
