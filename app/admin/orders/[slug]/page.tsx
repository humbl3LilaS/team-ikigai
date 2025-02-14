import OrderDetails from "@/features/admin/orders/components/order-details";

const OrderDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    return <OrderDetails id={slug} />;
};

export default OrderDetailPage;
