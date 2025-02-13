import Image from "next/image";

const ComplainsDetails = () => {
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
                <div className="mt-10 flex flex-row items-start justify-between gap-5">
                    <div className="w-1/2 h-full flex flex-col items-center justify-center border border-gray-300 rounded-md p-5 gap-5 shadow-sm mb-4 bg-white">
                        <div className="w-40 h-40 border border-neutral-200 bg-gray-100 flex items-center justify-center">
                            <Image
                                src="/productImage.png"
                                width={100}
                                height={100}
                                alt="Product Image"
                                className="object-contain"
                            />
                        </div>
                        <div className="w-full text-center flex flex-col items-center justify-center">
                            <p className="text-2xl font-semibold">Laptop 1</p>
                            <p className="text-gray-600">Color: Red</p>
                            <p className="text-gray-600">Unit Price: $100</p>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-start border border-gray-300 rounded-md p-5 gap-5 shadow-sm mb-4 bg-white">
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Order Item ID:</p>
                            <p className="text-gray-600">123132313113</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Invoice ID:</p>
                            <p className="text-gray-600">123132313113</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Type:</p>
                            <p className="text-gray-600">RETURN</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Issue:</p>
                            <p className="text-gray-600">Color correction error</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Complain Status:</p>
                            <p className="text-gray-600">Fatal</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <p className="font-semibold">Reason:</p>
                            <p className="text-gray-600">I want to request a new product!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ComplainsDetails