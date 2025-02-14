import Image from "next/image";
import Link from "next/link";
import React from "react";

import AdsSlide from "./adsSlide";

const Category = () => {

    const categories = [
        { name: "Laptop", icon: "/category/mac2.png",className:"" },
        { name: "Processor", icon: "/category/processor.png",className:"" },
        { name: "Monitor", icon: "/category/monitor.png",className:"" },
        { name: "Storage Device", icon: "/category/storage2.png",className:"" },
        { name: "Printer", icon: "/category/printer2.png",className:"" },
        { name: "Accessories", icon: "/category/accessories.png",className:"" },
        { name: "Power Supply", icon: "/category/power_supply.png",className:"" },
        { name: "Desktop", icon: "/category/desktop2.png",className:"" },
        { name: "Networking Device", icon: "/category/networking.png",className:"scale-75" },
        { name: "Memory", icon: "/category/memory.png",className:"" },
    ];
  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-20">
        <h1 className='font-oswald text-2xl font-bold pb-5'>Browse by Category</h1>
        <div className="grid grid-cols-12 gap-3">
            {
                categories.map((item,index)=>(
                    <Link href={`/category?category=${item.name.replace(/[^a-zA-Z0-9]/g,"+")}`} key={item.name+index} className="p-3 col-span-6 xs:col-span-4 sm:col-span-3 md:col-span-2 rounded-sm flex flex-col justify-between bg-gray-200 w-full overflow-hidden gap-1 items-center">
                        <Image src={item.icon} alt={item.name} width={150} height={150} className={item.className+"h-full w-full object-cover p-2"}/>
                        <span className="overflow-hidden text-sm font-oswald scale-y-95 line-clamp-1">{item.name.replace(/[^a-zA-Z0-9]+/g," ")}</span>
                    </Link>
                ))
            }
            <div className='col-span-12 xs:col-span-8 sm:col-span-6 md:col-span-4 bg-gray-200 rounded-sm w-full'>
                <AdsSlide/>
            </div>
        </div>
    </div>
  );
};

export default Category;