const DeliveryDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    return (
        <div>
            Delivery Detail Page
            <p>{slug}</p>
        </div>
    );
};

export default DeliveryDetailPage;
