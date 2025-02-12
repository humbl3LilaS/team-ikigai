import { redirect } from "next/navigation";

import { auth } from "@/auth";
import OrderListPage from "@/features/client/user/orders/components/OrderListPage";

export default async function OrdersPage() {
    const session = await auth();
    if (!session) {
        return redirect("/sign-in");
    }

    return <OrderListPage userId={session.user.id} />;
}
