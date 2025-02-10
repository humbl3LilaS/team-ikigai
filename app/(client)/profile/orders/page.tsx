import OrderListPage from "@/features/profile/components/orderList";

import { order } from "../userdata";

const OrderList = () => {
    return <OrderListPage orders={order} />;
};

export default OrderList;
