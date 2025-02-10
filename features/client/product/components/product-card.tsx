"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { IProductDetails } from "@/database/schema";

const ProductCard = ({ data }: { data: IProductDetails }) => {
    return (
        <div className="flex justify-between flex-col p-3 sm:p-5 min-w-52 rounded-md mt-10 border border-gray-200 w-full">
            <Link href={`/product/${data.id}`} className="block w-full ">
                <Image
                    src={data.imageUrl}
                    alt={data.name}
                    width={250}
                    height={250}
                    className={"w-full max-h-[250px]"}
                />
            </Link>
            <div className="flex flex-col gap-2 font-space-grotesk">
                <Link href="/product/4">
                    <h1 className="font-semibold py-2">{data.name}</h1>
                </Link>
                <p className="text-blue-600 cursor-pointer">
                    <span className="font-semibold text-sm text-black hover:text-blue-500">
                        &nbsp;${data.price}
                    </span>
                </p>
                <Button className="px-10" asChild={true}>
                    <Link href={`/product/${data.id}`}>View Details</Link>
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
