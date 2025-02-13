import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import DeliveryTable from "@/features/admin/delivery/components/delivery-table";

export default async function DeliveriesPage() {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }
    const role = session.user.role;
    const acceptRoles = adminSideBarItems.find(
        ({ title }) => title == "Deliveries",
    );
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }
    return (
        <section className={"flex-1 p-6"}>
            {role === "WAREHOUSE_MANAGER" && (
                <>
                    <h2 className={"mb-4 font-bold text-xl"}>
                        Deliveries Table
                    </h2>
                    <DeliveryTable />
                </>
            )}
            {role === "DRIVER" && (
                <>
                    <h2 className={"mb-4 font-bold text-xl"}>
                        Your Deliveries
                    </h2>
                    <DeliveryTable userId={session.user.id} />
                </>
            )}
        </section>
    );
}
