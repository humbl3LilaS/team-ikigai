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
                            <p>Contact Info</p>
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
                <div className="mt-10">
                    <div className="w-full h-full flex flex-row items-start border border-black rounded-md p-5 gap-5">
                        <div className="w-24 h-24 flex items-center justify-center border border-neutral-200 ">
                            Image
                        </div>
                        <div>
                            <p>Laptop 1</p>
                            <p>Color: red</p>
                            <p>Quantity: 30</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InvoiceDetail;
