import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import OrderTable from "@/features/admin/order/components/order-table";

export default async function OrderPage() {
    const role = (await auth())?.user.role;
    const acceptRoles = adminSideBarItems.find(({ title }) => title == "Orders");
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }
    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Orders Table</h2>
            <OrderTable />
        </section>
    );
}
