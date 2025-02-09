"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";

const ProductCard = () => {
    const handleAddToCart = () => {};
    return (
        <div className="bg-black/5 p-3 sm:p-5 min-w-52 rounded-md w-full">
            <Link href="/product/4">
                <Image
                    src="/laptop.webp"
                    alt="product"
                    width={250}
                    height={250}
                    className=""
                />
            </Link>
            <div className="flex flex-col gap-2">
                <Link href="/product/4">
                    <h1 className="font-semibold py-2">MSI 6x2II</h1>
                </Link>
                {/* <div className="flex gap-2 items-center cursor-pointer">
                    <ShoppingCart className="text-blue-600" />
                    <span className="text-sm">Add to cart</span>
                </div> */}
                <p className="text-blue-600 cursor-pointer">
                    ${" "}
                    <span className="font-semibold text-sm text-black hover:text-blue-500">
                        988
                    </span>
                </p>
                <Button
                    className="px-10"
                    onClick={() => {
                        handleAddToCart();
                    }}
                >
                    <span>
                        <ShoppingCartIcon />
                    </span>
                    <p>Add to Cart</p>
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
