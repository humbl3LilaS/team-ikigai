import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const ProductCard = () => {
    return (
        <div className="bg-black/5 p-3 sm:p-5 min-w-52 rounded-md w-full">
            <Link href="/cart">
                <Image
                    src="/laptop.webp"
                    alt="product"
                    width={250}
                    height={250}
                    className=""
                />
            </Link>
            <div className="flex flex-col gap-2">
                <h1 className="">MSI 6x2II</h1>
                <div className="flex gap-2 items-center cursor-pointer">
                    <ShoppingCart className="text-blue-600" />
                    <span className="text-sm">Add to cart</span>
                </div>
                <Button className="px-10">Buy</Button>
            </div>
        </div>
    );
};

export default ProductCard;
