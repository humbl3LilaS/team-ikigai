import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";


import { getCustomerDetailsById } from "../actions/get-customer-by-id";

const CustomerDetails = async ({ id }: { id: string }) => {
    const userInfo = await getCustomerDetailsById(id);
    // console.log(userInfo);
    if (!userInfo) {
        return notFound();
    }

    return (
        <>
            <section className="w-full flex flex-col items-center justify-center p-4">
                <div className="border border-foreground bg-muted w-36 h-36 rounded-full flex items-center justify-center text-xl mb-4">
                    <Image src={`https://robohash.org/${userInfo.user[0].userId}?set=set3`} width={300} height={300} alt="user avatar" />
                </div>
                <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-foreground">{userInfo.user[0].name}</p>
                </div>
                <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                    <div className="mb-4">
                        <p className="flex items-center justify-between text-muted-foreground">
                            <span className="font-semibold">Email:</span>
                            <span>{userInfo.user[0].email}</span>
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="flex items-center justify-between text-muted-foreground">
                            <span className="font-semibold">Phone Number:</span>
                            <span>{userInfo.user[0].phoneNumber}</span>
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="flex items-center justify-between text-muted-foreground">
                            <span className="font-semibold">Address:</span>
                            <span>{userInfo.user[0].address}</span>
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="flex items-center justify-between text-muted-foreground">
                            <span className="font-semibold">City:</span>
                            <span>{userInfo.user[0].city}</span>
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="flex items-center justify-between text-muted-foreground">
                            <span className="font-semibold">Region:</span>
                            <span>{userInfo.user[0].region}</span>
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full flex flex-col items-center justify-center p-4">
                <div className="font-bold flex items-center justify-center text-xl mb-4">
                    Recent Orders
                </div>
                {
                    userInfo.ordersData.map((order, index) => (
                        <details key={index} className={`group h-full w-full max-w-screen-sm mx-auto flex flex-col justify-between items-start pt-4 px-4 border-2 ${order.status === "PENDING" ? "border-orange-400" : "border-green-500"} rounded-md gap-4 mb-4 shadow-lg`}>
                            <summary className="w-full flex items-center justify-between cursor-pointer">
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center justify-between text-muted-foreground mb-2">
                                        <span className="font-semibold">Order ID:</span>
                                        <span>{order.orderId}</span>
                                    </p>
                                    <p className="flex items-center justify-between text-muted-foreground mb-2">
                                        <span className="font-semibold">Order Date:</span>
                                        <span>{format(
                                            new Date(order.createdAt),
                                            "do MMM yyyy",
                                        )}</span>
                                    </p>
                                    <p className="flex items-center justify-between text-muted-foreground mb-2">
                                        <span className="font-semibold">Status:</span>
                                        <span className={`${order.status === "PENDING" ? "text-orange-400" : "text-green-500"} `}>{order.status}</span>
                                    </p>
                                    <p className="flex items-center justify-between text-muted-foreground mb-2">
                                        <span className="font-semibold">Total Price:</span>
                                        <span>$ {order.totalAmount.toLocaleString()}</span>
                                    </p>

                                    <div className="flex items-center justify-center">
                                        <ChevronDown className="group-open:-scale-y-100 transition-transform" />
                                    </div>
                                </div>
                            </summary>
                            <div className="mt-2">
                                <hr />
                                <div className="mb-2">
                                    <span className="font-semibold text-xl text-foreground">Products</span>
                                    <div>
                                        <div className="flex items-center justify-start gap-5 my-4">
                                            <div className="w-24 h-24 border border-muted-foreground rounded-md flex items-center justify-center bg-muted">
                                                <Image src={order.imageUrl} width={96} height={96} alt="product image" />
                                            </div>
                                            <div className="w-3/4 flex flex-col">
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Product Name:</span>
                                                    <span>{order.name}</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Color:</span>
                                                    <span className="w-6 h-6 rounded-full" style={{ backgroundColor: order.colorHex }}></span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Quantity:</span>
                                                    <span>{order.quantity}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </details>
                    ))
                }
            </section>
        </>
    );
};
export default CustomerDetails;