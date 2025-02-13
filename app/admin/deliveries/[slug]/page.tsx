import DeliveryDetail from "@/features/admin/delivery/components/delivery-detail";

const DeliveryDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    return (
        <div>
            <DeliveryDetail id={slug} />
        </div>
    );
};

export default DeliveryDetailPage;
