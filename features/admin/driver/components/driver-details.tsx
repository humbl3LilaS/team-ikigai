import DriverDeliveriesTable from "./driver-deliveries-table";

const DriverDetails = () => {
    return (
        <>
            <section className="flex flex-col items-center justify-center md:p-4">
                <div className="border border-black w-36 h-36 rounded-full flex items-center justify-center text-xl mb-4 ">
                    Profile Image
                </div>
                <p className="flex items-center justify-center mb-2">
                    <span className="font-bold text-xl">Min Khant Kyaw Swar</span>
                </p>
                <div className="w-full max-w-md p-4 rounded-lg shadow-md">
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Driver ID:</span>
                        <span>1</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Vehicle Plate Number:</span>
                        <span>123/141</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Delivery Route:</span>
                        <span>Yangon</span>
                    </p>
                    <p className="flex items-center justify-between">
                        <span className="font-semibold">Order Limit:</span>
                        <span>5</span>
                    </p>
                </div>
            </section>
            <section className="w-full flex flex-col items-center justify-center md:p-4">
                <p className="font-bold flex items-center justify-center text-xl mb-4">Recent Deliveries</p>
                <DriverDeliveriesTable />
            </section>
        </>
    )
}
export default DriverDetails;