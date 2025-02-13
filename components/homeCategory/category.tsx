import Image from "next/image";
import Link from "next/link";
import React from "react";

const categories = [
    { name: "Laptop", icon: "/flaticon/laptop.png",className:"" },
    { name: "Processor", icon: "/flaticon/processor.png",className:"" },
    { name: "Monitor", icon: "/flaticon/monitor.png",className:"" },
    { name: "Strorage+Device", icon: "/flaticon/storage.png",className:"" },
    { name: "Printer", icon: "/flaticon/printer.png",className:"" },
    { name: "Accessories", icon: "/flaticon/accessories.png",className:"" },
    { name: "Power+Supply", icon: "/flaticon/power-supply.png",className:"" },
    { name: "Desktop", icon: "/flaticon/desktop.png",className:"" },
    { name: "Networking+Devices", icon: "/flaticon/networking.png",className:"scale-75" },
    { name: "Memory", icon: "/flaticon/memory.png",className:"" },
];

const HomeCategory = () => {
  return (
    <section className='w-full mt-14'>
        <h1 className='font-oswald text-2xl font-bold pb-5'>Browse by Category</h1>
        <div className='max-w-full flex gap-5 justify-between py-2 lg:no-scrollbar overflow-x-scroll small-scrollbar'>
            {
                categories.map((item,index)=>(
                    <Link href={`/category?category=${item.name}`} key={item.name+index}>
                        <div key={index} className='flex justify-center items-center flex-col w-[100px] p-2 shadow-lg rounded-md gap-2'>
                            <Image src={item.icon as string} alt={item.name} width={50} height={50} className={item.className+""}/>
                            <span className="w-fit line-clamp-1 mx-auto text-center text-sm text-[#2a384b] rounded-full ">{item.name.replace(/[^a-zA-Z0-9]+/g," ")}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    </section>
  );
};

export default HomeCategory;