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
import { getInvoiceDetailsById } from "@/features/admin/invoices/actions/get-invoice-details-by-id";

const InvoiceDetail = async ({ id }: { id: string }) => {
    const invoiceInfo = await getInvoiceDetailsById(id);
    if (!invoiceInfo) {
        return notFound();
    }

    return (
        <section className="px-20 py-8 select-none">
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
                    Invoice To
                </h1>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-5">
                        <div className="">
                            <h2 className="text-2xl font-bold">
                                {invoiceInfo.user.name}
                            </h2>
                        </div>
                        <div className="w-full border-b-[0.05px] border-dotted border-white" />
                        <div className="text-sm">
                            <p>Contact Info</p>
                            <p>Phone : {invoiceInfo.user.contactNumber}</p>
                            <p>Email : {invoiceInfo.user.email}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="text-sm">
                            <p>Invoice No {id}</p>
                            <p>
                                Invoice date :{" "}
                                {format(
                                    invoiceInfo.user.invoiceDate,
                                    "do MMM yyyy",
                                )}
                            </p>
                        </div>
                        <div />
                    </div>
                </div>
                <div className="mt-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-center">
                                    quantity
                                </TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoiceInfo.products.map((invoice, index) => (
                                <TableRow key={index}>
                                    <TableCell>{invoice.name}</TableCell>
                                    <TableCell className="text-center">
                                        {invoice.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${invoice.price * invoice.quantity}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3} className="">
                                    Total
                                </TableCell>
                                <TableCell className="text-right">
                                    ${invoiceInfo.user.totalAmount}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </section>
    );
};

export default InvoiceDetail;
