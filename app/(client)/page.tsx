import Link from "next/link";

import Footer from "@/components/footer/Footer";
import Description from "@/components/homeProduct/Description";
import Hero from "@/components/homeProduct/Hero";
import ProductList from "@/features/client/product/components/product-list";

export default async function Home() {
    return (
        <section className="p-4 sm:p-6">
            <div className="mt-6">
                <Hero />

                <div className="grid grid-cols-3 md:grid-cols-5 max-w-[1000px] gap-4 mx-auto">
                    <div className="flex justify-center items-center bg-white mt-6">
                        <Link
                            href={`/category?category=Laptop`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[150px] bg-blue-200 rounded-lg justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/laptop.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold text-xl backdrop-blur p-3">
                                    Laptop
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6 row-span-2">
                        <Link
                            href={`/category?category=Processor`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[340px] bg-blue-200 rounded-lg justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/processor.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold -rotate-90 text-xl backdrop-blur p-3">
                                    Processor
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6">
                        <Link
                            href={`/category?category=Monitor`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[150px] bg-blue-200 rounded-lg justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/monitor.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold text-xl backdrop-blur p-3">
                                    Monitor
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6 row-span-2">
                        <Link
                            href={`/category?category=Storage+Device`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[340px] bg-blue-200 rounded-lg border-2 justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/storage.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold -rotate-90 text-xl backdrop-blur p-3">
                                    StorageDevice
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6">
                        <Link
                            href={`/category?category=Printer`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[150px] bg-blue-200 rounded-lg justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/printer.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold text-xl backdrop-blur p-3">
                                    Printer
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6 row-span-2">
                        <Link
                            href={`/category?category=Accessories`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex h-[360px] w-[150px] bg-blue-200 rounded-lg justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/accessory.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold -rotate-90 text-xl backdrop-blur p-3">
                                    Accessories
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6 md:row-span-2">
                        <Link
                            href={`/category?category=Power+Supply`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[150px] md:h-[340px] bg-blue-200 rounded-lg border-2 justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/power.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold -rotate-90 text-xl backdrop-blur p-3 inline-block">
                                    PowerSupply
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6 row-span-2">
                        <Link
                            href={`/category?category=Networking+Device`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[340px] bg-blue-200 rounded-lg justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/network.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold -rotate-90 text-xl backdrop-blur p-3">
                                    NetworkingDevice
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6 ">
                        <Link
                            href={`/category?category=Memory`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[150px] bg-blue-200 rounded-lg border-2 justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/memory.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold text-xl backdrop-blur p-3">
                                    Memory
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-white mt-6">
                        <Link
                            href={`/category?category=Desktop`}
                            className="text-md font-semibold text-foreground px-4"
                        >
                            <div
                                className="flex w-[150px] h-[150px] bg-blue-200 rounded-lg border-2 justify-center items-center shadow-lg"
                                style={{
                                    backgroundImage:
                                        "url('/categories/desktop.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <span className="text-white font-extrabold text-xl backdrop-blur p-3">
                                    Desktop
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
                <ProductList />
                <Description />
            </div>
            <Footer />
        </section>
    );
}
