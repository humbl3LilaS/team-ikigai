"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const CustomerDetails = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <section className="w-full flex flex-col items-center justify-center p-4">
                <div className="border border-foreground bg-muted w-36 h-36 rounded-full flex items-center justify-center text-xl mb-4">
                    Profile Image
                </div>
                <p className="flex items-center justify-center mb-2">
                    <span className="font-bold text-xl">Min Khant Kyaw Swar</span>
                </p>
                <div className="w-full max-w-md p-4 rounded-lg shadow-md">
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Customer ID:</span>
                        <span>4d196ad8-1ec2</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Email:</span>
                        <span>minkhantkyawswar@gmail.com</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Phone Number:</span>
                        <span>09 794184997</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Address</span>
                        <span>Yangon</span>
                    </p>
                    <p className="flex items-center justify-between mb-2">
                        <span className="font-semibold">City</span>
                        <span>Yangon</span>
                    </p>
                    <p className="flex items-center justify-between">
                        <span className="font-semibold">Region</span>
                        <span>Yangon</span>
                    </p>
                </div>
            </section>
            <section className="w-full flex flex-col items-center justify-center p-4">
                <div className="font-bold flex items-center justify-center text-xl mb-4">
                    Recent Orders
                </div>
                <div className="h-full w-full md:w-1/2 flex justify-between items-start p-4 border-2 border-orange-400 rounded-md gap-4 mb-4 shadow-lg">
                    <div className="w-full flex flex-col">
                        <p className="flex items-center justify-between text-muted-foreground mb-2">
                            <span className="font-semibold">Order ID:</span>
                            <span>15131123</span>
                        </p>
                        <p className="flex items-center justify-between text-muted-foreground mb-2">
                            <span className="font-semibold">Order Date:</span>
                            <span>16/2/2025</span>
                        </p>
                        <p className="flex items-center justify-between text-muted-foreground mb-2">
                            <span className="font-semibold">Status</span>
                            <span className="text-orange-500">Pending</span>
                        </p>
                        {isVisible && (
                            <div className="">
                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                    <span className="font-semibold">Total Items:</span>
                                    <span>7</span>
                                </p>
                                <p className="flex items-center justify-between text-muted-foreground mb-4">
                                    <span className="font-semibold">Total Price:</span>
                                    <span>$699</span>
                                </p>

                                <hr />
                                <div className="mb-2">
                                    <span className="font-semibold text-xl text-foreground">Products</span>
                                    <div>
                                        <div className="flex items-center justify-start gap-5 my-4">
                                            <div className="w-24 h-24 border border-muted-foreground rounded-md flex items-center justify-center bg-muted">
                                                image
                                            </div>
                                            <div className="w-3/4 flex flex-col">
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Product Name:</span>
                                                    <span>ASUS laptop</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Color:</span>
                                                    <span>Red</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Quantity:</span>
                                                    <span>7</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-start gap-5 my-4">
                                            <div className="w-24 h-24 border border-muted-foreground rounded-md flex items-center justify-center bg-muted">
                                                image
                                            </div>
                                            <div className="w-3/4 flex flex-col">
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Product Name:</span>
                                                    <span>ASUS GPU</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Color:</span>
                                                    <span>Black</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Quantity:</span>
                                                    <span>2</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="hover:bg-muted w-7 h-7 flex items-center justify-center rounded-full" onClick={() => setIsVisible(!isVisible)}> {isVisible ? <p className="flex"> < ChevronUp /></p> : <p className="flex">< ChevronDown /></p>}</button>

                </div>
                <div className="h-full w-full md:w-1/2 flex justify-between items-start p-4 border-2 border-green-400 rounded-md gap-4 mb-4 shadow-lg">
                    <div className="w-full flex flex-col">
                        <p className="flex items-center justify-between text-muted-foreground mb-2">
                            <span className="font-semibold">Order ID:</span>
                            <span>350290181</span>
                        </p>
                        <p className="flex items-center justify-between text-muted-foreground mb-2">
                            <span className="font-semibold">Order Date:</span>
                            <span>17/2/2025</span>
                        </p>
                        <p className="flex items-center justify-between text-muted-foreground mb-2">
                            <span className="font-semibold">Status</span>
                            <span className="text-green-500">Delivered</span>
                        </p>
                        {isVisible && (
                            <div className="">
                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                    <span className="font-semibold">Total Items:</span>
                                    <span>7</span>
                                </p>
                                <p className="flex items-center justify-between text-muted-foreground mb-4">
                                    <span className="font-semibold">Total Price:</span>
                                    <span>$699</span>
                                </p>

                                <hr />
                                <div className="mb-2">
                                    <span className="font-semibold text-xl text-foreground">Products</span>
                                    <div>
                                        <div className="flex items-center justify-start gap-5 my-4">
                                            <div className="w-24 h-24 border border-muted-foreground rounded-md flex items-center justify-center bg-muted">
                                                image
                                            </div>
                                            <div className="w-3/4 flex flex-col">
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Product Name:</span>
                                                    <span>ASUS laptop</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Color:</span>
                                                    <span>Red</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Quantity:</span>
                                                    <span>7</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-start gap-5 my-4">
                                            <div className="w-24 h-24 border border-muted-foreground rounded-md flex items-center justify-center bg-muted">
                                                image
                                            </div>
                                            <div className="w-3/4 flex flex-col">
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Product Name:</span>
                                                    <span>ASUS GPU</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Color:</span>
                                                    <span>Black</span>
                                                </p>
                                                <p className="flex items-center justify-between text-muted-foreground mb-2">
                                                    <span className="font-semibold">Quantity:</span>
                                                    <span>2</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsVisible(!isVisible)}> {isVisible ? <p className="flex"> < ChevronUp /></p> : <p className="flex">< ChevronDown /></p>}</button>

                </div>
            </section>
        </>
    );
};
export default CustomerDetails;