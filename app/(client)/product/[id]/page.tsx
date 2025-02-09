import ProductSlider from "@/components/slider/productSlider";
import { Button } from "@/components/ui/button";
import {
    Battery,
    ComputerIcon,
    Laptop,
    ScreenShare,
    Shrink,
} from "lucide-react";
import React from "react";
import { getProductById } from "@/actions/get-product-by-id";
import { notFound } from "next/navigation";

const ProductDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    if (!id) {
        return notFound();
    }

    const productInfo = await getProductById(id);
    if (!productInfo) {
        return notFound();
    }
    return (
        <section className="w-full flex flex-col md:flex-row">
            <div className="flex p-5 md:w-1/2 md:flex-1 gap-5 sm:gap-10 flex-col">
                <div className="w-full flex flex-col gap-10">
                    <ProductSlider images={[productInfo.imageUrl]} />
                </div>
                <div className="mx-auto flex flex-col items-center gap-4">
                    <h1>Available in {productInfo.colors.length} colors</h1>
                    <div className="flex gap-2">
                        {productInfo.colors.map((item) => (
                            <span className={""} key={item.colorHex} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 p-5">
                <h1 className="text-3xl font-bold text-wrap">
                    Lenovo ThinkPad P16s Gen 2 (16″ Intel) Mobile Workstation
                </h1>
                <div className="">
                    <div className="flex gap-4 py-3">
                        <p className="text-sm mt-2">
                            From 988$ or $95.3/mo. for 12 mo
                        </p>
                        <Button className="bg-blue-600 px-6 rounded-[1000px]">
                            Buy
                        </Button>
                    </div>
                    <div className="flex flex-col gap-1 mt-8">
                        <div className="flex gap-3 items-center p-2">
                            <Shrink className="size-12" />
                            <p className="text-md font-semibold">
                                Lightweight and under half an inch thin, so you
                                can take MacBook Air anywhere you go
                            </p>
                        </div>
                        <div className="w-full bg-black p-[0.04px]" />

                        <div className="flex gap-3 items-center p-2">
                            <ComputerIcon className="size-12" />
                            <p className="text-md font-semibold">
                                The powerful 8-core CPU and up to 10-core GPU of
                                the Apple M2 chip keep things running smoothly
                            </p>
                        </div>
                        <div className="w-full bg-black p-[0.04px]" />

                        <div className="flex gap-3 items-center p-2">
                            <Battery className="size-12" />
                            <p className="text-md font-semibold">
                                Up to 18 hours of battery life, so you can leave
                                the power adapter at home footnote ¹
                            </p>
                        </div>
                        <div className="w-full bg-black p-[0.04px]" />

                        <div className="flex gap-3 items-center p-2">
                            <ScreenShare className="size-8" />
                            <p className="text-md font-semibold">
                                The 13.6-inch Liquid Retina display supports 1
                                billion colors footnote ²
                            </p>
                        </div>
                        <div className="w-full bg-black p-[0.04px]" />

                        <div className="flex gap-3 items-center p-2">
                            <Laptop className="size-9" />
                            <p className="text-md font-semibold">
                                Support for one external display
                            </p>
                        </div>
                        <div className="w-full bg-black p-[0.04px]" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailPage;
