import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getDriverDetailsById } from "../actions/get-driver-details-by-id";

const DriverDetails = async ({ id }: { id: string }) => {
    const driverInfo = await getDriverDetailsById(id);
    if (!driverInfo) {
        return notFound();
    }

    return (
        <>
            <section className="flex flex-col items-center justify-center md:p-4">
                <div className="border border-black w-36 h-36 rounded-full flex items-center justify-center text-xl mb-4 ">
                    <Image src={`https://robohash.org/${driverInfo.user[0].driverId}?set=set3`} width={300} height={300} alt="user avatar" />
                </div>
                <p className="flex items-center justify-center mb-2">
                    <span className="font-bold text-xl">{driverInfo.user[0].name}</span>
                </p>
                <div className="w-full max-w-md p-4 rounded-lg shadow-md">
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Driver ID:</span>
                        <span>{driverInfo.user[0].driverId}</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Vehicle Plate Number:</span>
                        <span>{driverInfo.user[0].vehiclePlateNumber}</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Delivery Route:</span>
                        <span>{driverInfo.user[0].deliveryRoute}</span>
                    </p>
                </div>
            </section>
            <section className="w-full flex flex-col items-center justify-center md:p-4">
                <p className="font-bold flex items-center justify-center text-xl mb-4">Recent Deliveries</p>
                <div className="mt-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">
                                    Delivery ID
                                </TableHead>
                                <TableHead className="text-center">
                                    Order ID
                                </TableHead>
                                <TableHead className="text-center">
                                    Created At
                                </TableHead>
                                <TableHead className="text-right">
                                    Delivered Date
                                </TableHead>
                                <TableHead className="text-right">
                                    Delivered Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {driverInfo.deliveries.map((delivery, index) => (
                                <TableRow key={index}>
                                    <TableCell>{delivery.id}</TableCell>
                                    <TableCell className="text-center">
                                        {delivery.orderId}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {format(
                                            delivery.createdAt,
                                            "do MMM yyyy",
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {
                                            delivery.deliveredDate == null ? (
                                                <p>Not Delivered Yet.</p>
                                            ) : (
                                                format(
                                                    delivery.deliveredDate,
                                                    "do MMM yyyy"
                                                )
                                            )
                                        }
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {delivery.deliveryStatus}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
                </div>
            </section>
        </>
    )
}
export default DriverDetails;