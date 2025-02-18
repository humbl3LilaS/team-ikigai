import { format } from "date-fns";
import { Circle } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getComplainsById } from "@/features/admin/complain/actions/get-complains-by-id";

const ComplainsDetails = async ({ id }: { id: string }) => {
    const complainInfo = await getComplainsById(id);
    if (!complainInfo) {
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
                <h1 className="text-md uppercase font-semibold">
                    Complains Details Information
                </h1>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-5">
                        <div className="w-full border-b-[0.05px] border-dotted border-white" />
                        <div className="text-sm">
                            <p className="font-semibold text-xl">
                                Contact Info
                            </p>
                            <p>Name : {complainInfo?.customer.name}</p>
                            <p>Phone : {complainInfo?.customer.phone}</p>
                            <p>Email : {complainInfo?.customer.email}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="text-sm">
                            <p>Complain Id: {complainInfo.id}</p>
                            <p>
                                Complain Date :
                                {format(complainInfo.createdAt, "do MMM yyyy")}
                            </p>
                        </div>
                        <div />
                    </div>
                </div>
                <div className="mt-10 flex flex-row items-start justify-between gap-5">
                    <div className="w-1/2 h-full flex flex-col items-center justify-center border border-gray-300 rounded-md p-5 gap-5 shadow-sm mb-4 bg-white">
                        <div className="w-40 h-40 border border-neutral-200 bg-gray-100 flex items-center justify-center">
                            <Image
                                src={complainInfo.product.imageUrl}
                                width={100}
                                height={100}
                                alt="Product Image"
                                className="object-contain"
                            />
                        </div>
                        <div className="w-full text-center flex flex-col items-center justify-center">
                            <p className="text-2xl font-semibold">
                                {complainInfo.product.name}
                            </p>
                            <p className="flex text-gray-600 gap-2">
                                <span>Color: </span>
                                <Circle
                                    className="rounded-full"
                                    style={{
                                        backgroundColor:
                                            complainInfo.product.colorHex,
                                    }}
                                ></Circle>
                            </p>
                            <p className="text-gray-600">
                                Unit Price: $ {complainInfo.product.price}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-start border border-gray-300 rounded-md p-5 gap-5 shadow-sm mb-4 bg-white">
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Order Item ID:</p>
                            <p className="text-gray-600">
                                {complainInfo.orderItemId}
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Invoice ID:</p>
                            <p className="text-gray-600">
                                {complainInfo.invoiceId}
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Type:</p>
                            <p className="text-gray-600">{complainInfo.type}</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Issue:</p>
                            <p className="text-gray-600">
                                {complainInfo.issues}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplainsDetails;
