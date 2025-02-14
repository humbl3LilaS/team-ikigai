import Image from "next/image";
import { getOrderById } from "../actions/get-order-details-by-id";
import { format } from "date-fns";
import { Circle } from "lucide-react";

const OrderDetails = async ({ id }: { id: string }) => {
    const orderInfo = await getOrderById(id);
    const regex = /^(.*?)\s*-\s*.*$/;
    const matchCity = regex.exec(orderInfo?.customer.city as string);
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
                    Order Detail Information
                </h1>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-5">
                        <div className="w-full border-b-[0.05px] border-dotted border-white" />
                        <div className="text-sm">
                            <p className="font-semibold text-xl">
                                Contact Info
                            </p>
                            <p>Name : {orderInfo?.customer.name}</p>
                            <p>Phone : {orderInfo?.customer.phone}</p>
                            <p>Email : {orderInfo?.customer.email}</p>
                            <p>
                                Address: {orderInfo?.customer.address},{" "}
                                {matchCity ? matchCity[1] : "Unknown City"},{" "}
                                {orderInfo?.customer.region}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="text-sm">
                            <p>Order No: {orderInfo?.customer.orderId}</p>
                            <p>
                                Order date :{" "}
                                {orderInfo?.customer.orderDate
                                    ? format(
                                          orderInfo.customer.orderDate,
                                          "do MMM yyyy",
                                      )
                                    : "Unknown Date"}
                            </p>
                        </div>
                        <div />
                    </div>
                </div>
                <div className="mt-10 flex flex-col justify-between">
                    {orderInfo?.products.map((product) => (
                        <div
                            key={product.productId}
                            className="w-full h-full flex flex-row items-start border border-gray-300 rounded-md p-5 gap-5 shadow-sm mb-4"
                        >
                            <div className="w-28 h-28 flex items-center justify-center border border-neutral-200 bg-gray-100">
                                <Image
                                    src={product.productImage}
                                    width={100}
                                    height={100}
                                    alt="Image"
                                    className="object-contain"
                                />
                            </div>
                            <div className="w-3/4">
                                <p className="text-xl font-bold pb-2">
                                    {product.name}
                                </p>
                                <p className="flex text-gray-600 gap-2">
                                    <span>Color: </span>
                                    <Circle
                                        className="rounded-full"
                                        style={{
                                            backgroundColor:
                                                product.productColors,
                                        }}
                                    ></Circle>
                                </p>
                                <p className="text-gray-600">
                                    Quantity: {product.quantity}
                                </p>
                                <p className="text-gray-600">
                                    Unit Price: $ {product.price}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold text-2xl text-green-700">
                                    $ {product.price * product.quantity}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-end gap-5 mt-10">
                        <p className="text-2xl font-semibold ">Total Amount:</p>
                        <p className="text-2xl font-semibold text-green-700 mr-10">
                            $ {orderInfo?.customer.total}
                        </p>
                    </div>
                    <hr className="mt-4 " />
                </div>
            </div>
        </section>
    );
};

export default OrderDetails;
