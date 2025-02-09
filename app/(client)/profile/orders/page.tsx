// pages/order-list.tsx
import { GetServerSideProps, NextPage } from "next";
import OrderListPage, { Order } from "@/features/profile/components/orderList";
import { order } from "../userdata";

interface OrderListProps {
    orders: Order[];
}

const OrderList: NextPage<OrderListProps> = ({ orders }) => {
    return <OrderListPage orders={order} />;
};

export default OrderList;
