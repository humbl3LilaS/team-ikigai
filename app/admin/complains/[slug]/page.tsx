import ComplainsDetails from "@/features/admin/complain/components/complain-details";

const ComplainDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    return <ComplainsDetails id={slug} />;
};

export default ComplainDetailsPage;
