// import { auth } from "@/auth";
// import OrderListPage from "@/features/profile/components/orderList";

// import { getUserOrders } from "../actions/get-order-data";

// const OrderList = async () => {
//     const session = await auth();

//     if (!session) {
//         throw new Error("User is not authenticated");
//     }

//     const orders = (await getUserOrders(session.user.id)) ?? [];
//     return <OrderListPage orders={orders} />;
// };

// export default OrderList;

import { auth } from "@/auth";
import OrderListPage from "@/features/user/orderlist/components/OrderListPage";

export default async function OrdersPage() {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");

    return <OrderListPage userId={session.user.id} />;
}
