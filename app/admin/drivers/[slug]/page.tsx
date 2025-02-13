import DriverDetails from "@/features/admin/driver/components/driver-details";

const DriverDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>

}) => {
    const { slug } = await params;
    return (
        <>
            <DriverDetails id={slug} />
        </>
    );
};
export default DriverDetailsPage;