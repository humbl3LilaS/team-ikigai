import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import { IOrderStatus, UserRole } from "@/database/schema";
import OrderTable from "@/features/admin/orders/components/order-table";

const WRITE_PERMISSION: UserRole[] = ["SALES", "WAREHOUSE_MANAGER"];

const getOrderTableActionPermission = (
    role: UserRole,
): IOrderStatus | undefined => {
    switch (role) {
        case "SALES":
            return "PENDING";
        case "WAREHOUSE_MANAGER":
            return "APPROVE";
    }
};

export default async function OrderPage() {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }
    const role = session.user.role;
    const acceptRoles = adminSideBarItems.find(
        ({ title }) => title == "Orders",
    );
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }

    const permittedStatus = getOrderTableActionPermission(role);

    return (
        <section className={"flex-1 p-6"}>
            {WRITE_PERMISSION.includes(role) && (
                <>
                    <h2 className={"p-6 font-bold text-xl"}>Pending Orders</h2>
                    <OrderTable status={permittedStatus} />
                    <hr />
                </>
            )}
            <h2 className={" p-6 font-bold text-xl"}>All Orders</h2>
            <OrderTable />
        </section>
    );
}
