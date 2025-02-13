import { notFound } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getDeliveryById } from "../actions/get-delivery-details-by-id";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

const DeliveryDetail = async ({ id }: { id: string }) => {
    const deliveryInfo = await getDeliveryById(id);
    if (!deliveryInfo) {
        return notFound();
    }
    return (
        <section className="px-20 py-8 select-none max-w-[1200px] mx-auto">
            <div className="flex py-5 justify-between items-center gap-3">
                <Image
                    src="/brandLogo.png"
                    width={80}
                    height={80}
                    alt="logo"
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col ">
                <h1 className="text-md uppercase font-semibold scale-y-75">
                    Deliver To
                </h1>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-5">
                        <div className="">
                            <h2 className="text-2xl font-bold">
                                {deliveryInfo.customer.name}
                            </h2>
                        </div>
                        <div className="w-full border-b-[0.05px] border-dotted border-white" />
                        <div className="text-sm">
                            <p className="font-bold text-lg">Contact Info</p>
                            <p>Phone : {deliveryInfo.customer.phone}</p>
                            <p>
                                address : {deliveryInfo.customer.address} ,{" "}
                                {deliveryInfo.customer.city} ,{" "}
                                {deliveryInfo.customer.region}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="text-sm">
                            <p>Delivery No : {id}</p>
                            <p>
                                Delivery start date :{" "}
                                {format(
                                    deliveryInfo.delivery.createdAt,
                                    "do MMM yyyy",
                                )}
                            </p>
                            {deliveryInfo.delivery.deliveryStatus ===
                                "DELIVERED" && (
                                <p>
                                    Delivery end date :{" "}
                                    {deliveryInfo.delivery.deliveredDate
                                        ? format(
                                              deliveryInfo.delivery
                                                  .deliveredDate,
                                              "do MMM yyyy",
                                          )
                                        : "N/A"}
                                </p>
                            )}
                        </div>
                        <Separator />
                        <div className="text-sm">
                            <p>Driver : {deliveryInfo.driver.name}</p>
                            <p>Phone : {deliveryInfo.driver.phone}</p>
                            <p>
                                Vehicle Plate Number :{" "}
                                {deliveryInfo.driver.vehicleNumber}
                            </p>
                        </div>
                        <div />
                    </div>
                </div>
                <div className="mt-10">
                    <Table>
                        <TableHeader>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-center">
                                quantity
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableHeader>
                        <TableBody>
                            {deliveryInfo.products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell className="text-center">
                                        {product.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${product.price * product.quantity}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2} className="">
                                    Total
                                </TableCell>
                                <TableCell className="text-right">
                                    ${deliveryInfo.customer.total}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </section>
    );
};
export default DeliveryDetail;
