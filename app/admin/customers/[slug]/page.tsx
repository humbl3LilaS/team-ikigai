import CustomerDetails from "@/features/admin/customer/components/customer-details";

const CustomerDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>

}) => {
    const { slug } = await params;
    return (
        <CustomerDetails id={slug} />
    );
};

export default CustomerDetailsPage;