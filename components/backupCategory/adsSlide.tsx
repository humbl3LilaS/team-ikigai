"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const AdsSlide = () => {
    const [curIndex, setCurIndex] = useState(0);
    const item = [
        {
            src: "/airpodSlide.png",
            name: "AirPod",
        },
        {
            src: "/macAds.png",
            name: "MAC",
        },
    ];


    const goForward = () => {
        setCurIndex((prev) => (prev + 1) % item.length);
    };
    useEffect(() => {
        const interval = setInterval(goForward, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full rounded-sm relative p-3 flex justify-between overflow-hidden gap-2">
            {
                item.map((item, index) => (
                    <Image key={item.src} alt={item.name} className={`w-full inset-0 object-cover absolute transition-all duration-700 ${curIndex === index ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`} width={200} height={100} src={item.src} />
                ))
            }
            {/* <button onClick={goBack} className="absolute top-[50%] left-1 text-3xl font-bold rounded-full size-12 translate-y-[-50%] px-3 py-2 hover:bg-gray-200 ">{"<"}</button>
        <button onClick={goForward} className="absolute text-3xl font-bold top-[50%] right-1 rounded-full px-3 py-2 translate-y-[-50%] hover:bg-gray-200 text-center ">{">"}</button> */}
            <div className='flex gap-3 absolute bottom-3 left-[50%] translate-x-[-50%]'>
                {item.map((_, index) => (
                    <div key={index} className={`size-2 transition-all duration-300 rounded-full ${curIndex === index ? "bg-blue-500" : "bg-white border"}`} />
                ))}
            </div>
        </div>
    );
};

export default AdsSlide;