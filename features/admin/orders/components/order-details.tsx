import Image from "next/image";

const InvoiceDetail = async () => {

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
                        <div className="">
                            <h2 className="text-2xl font-bold">

                            </h2>
                        </div>
                        <div className="w-full border-b-[0.05px] border-dotted border-white" />
                        <div className="text-sm">
                            <p className="font-semibold text-xl">Contact Info</p>
                            <p>Name : Min Khant Kyaw Swar</p>
                            <p>Phone : 09 794184997</p>
                            <p>Email : mkks1986.mkks@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="text-sm">
                            <p>Order No: 191881918191</p>
                            <p>
                                Order date : 12/2/2025
                            </p>
                        </div>
                        <div />
                    </div>
                </div>
                <div className="mt-10 flex flex-col justify-between">
                    <div className="w-full h-full flex flex-row items-start border border-gray-300 rounded-md p-5 gap-5 shadow-sm mb-4">
                        <div className="w-28 h-28 flex items-center justify-center border border-neutral-200 bg-gray-100">
                            <Image
                                src="/productImage.png"
                                width={100}
                                height={100}
                                alt="Image"
                                className="object-contain"
                            />
                        </div>
                        <div className="w-3/4">
                            <p className="text-xl font-bold pb-2">Laptop 1</p>
                            <p className="text-gray-600">Color: Red</p>
                            <p className="text-gray-600">Quantity: 30</p>
                            <p className="text-gray-600">Unit Price: 400</p>

                        </div>
                        <div className="flex items-center">
                            <p className="font-bold text-2xl text-green-700">$ 12000</p>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-row items-start border border-gray-300 rounded-md p-5 gap-5 shadow-sm">
                        <div className="w-28 h-28 flex items-center justify-center border border-neutral-200 bg-gray-100">
                            <Image
                                src="/productImage.png"
                                width={100}
                                height={100}
                                alt="Image"
                                className="object-contain"
                            />
                        </div>
                        <div className="w-3/4">
                            <p className="text-xl font-bold pb-2">Laptop 2</p>
                            <p className="text-gray-600">Color: Black</p>
                            <p className="text-gray-600">Quantity: 30</p>
                            <p className="text-gray-600">Unit Price: 400</p>

                        </div>
                        <div className="flex items-center">
                            <p className="font-bold text-2xl text-green-700">$ 12000</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-5 mt-10">
                        <p className="text-2xl font-semibold ">Total Amount:</p>
                        <p className="text-2xl font-semibold text-green-700 mr-10">$24000</p>
                    </div>
                    <hr className="mt-4 " />
                </div>
            </div>
        </section>
    );
};

export default InvoiceDetail;
