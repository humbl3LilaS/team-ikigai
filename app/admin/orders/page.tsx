import { handleAdminRoutes } from "@/dashboard/handle-admin-routes";
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
    const session = await handleAdminRoutes("Orders");
    const role = session?.user.role;

    const permittedStatus = role ? getOrderTableActionPermission(role) : undefined;

    return (
        <section className={"flex-1 p-6"}>
            {role && WRITE_PERMISSION.includes(role) && (
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
