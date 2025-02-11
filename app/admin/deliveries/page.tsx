import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import DeliveryTable from "@/features/admin/delivery/components/delivery-table";

export default async function DeliveriesPage() {
    const role = (await auth())?.user.role;
    const acceptRoles = adminSideBarItems.find(({ title }) => title == "Deliveries");
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Deliveries Table</h2>
            <DeliveryTable />
        </section>
    );
}
