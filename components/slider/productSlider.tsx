"use client";

import { SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "../ui/button";

const ProductSlider = () => {
    const productImageData = [
        {
            src: "/lenovo.png",
            title: "front",
        },
        {
            src: "/backLenovo.png",
            title: "back",
        },
        {
            src: "/sideLenovo.avif",
            title: "side",
        },
    ];

    const [curIndex, setCurIndex] = useState(0);
    const handleGoBack = () => {
        setCurIndex((prev) =>
            prev - 1 < 0 ? productImageData.length - 1 : prev - 1,
        );
    };
    const handleGoForward = () => {
        setCurIndex((prev) => (prev + 1) % productImageData.length);
    };
    const handleSetIndex = (id: number) => {
        setCurIndex(id);
    };
    return (
        <>
            <div className="flex w-[70%] sm:w-[320px] h-[200px] sm:h-[250px] mx-auto p-5 relative">
                {productImageData.map((item, index) => (
                    <Image
                        key={item.src + index}
                        src={item.src}
                        alt={item.title}
                        className={` mx-auto ${curIndex === index ? "flex-1" : "hidden"}`}
                        width={100}
                        height={50}
                    />
                ))}
                <Button
                    className="absolute top-[50%] bg-gray-200 p-4 rounded-full -translate-y-[50%] -left-8"
                    onClick={handleGoBack}
                >
                    <SkipBack />
                </Button>
                <Button
                    className="absolute top-[50%] bg-gray-200 p-4 rounded-full -translate-y-[50%] -right-8"
                    onClick={handleGoForward}
                >
                    <SkipForward />
                </Button>
            </div>
            <div className="flex justify-center gap-2">
                {productImageData.map((_, index) => (
                    <div
                        onClick={() => handleSetIndex(index)}
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${curIndex === index ? "bg-blue-500" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        </>
    );
};

export default ProductSlider;
