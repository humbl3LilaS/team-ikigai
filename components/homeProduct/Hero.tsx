import Image from "next/image";
import React from "react";

const Hero = () => {
    return (
        <section className="flex gap-1 justify-center items-center md:gap-8 p-3 sm:p-5 relative">
            <div className="hidden md:block">
                <Image
                    src="/heroCover.gif"
                    alt="product"
                    width={500}
                    height={500}
                    className="mx-5 min-w-56"
                />
            </div>
            <div className="max-w-[500px] sm:max-w-[450px] text-center sm:text-start mt-8 font-inter min-h-full rounded-md p-3 lg:p-6 relative ">
                <h1 className="text-3xl sm:text-4xl pb-3 font-extrabold text-nowrap text-blue-600 -ms-1 font-inter">
                    Welcome to MyanTech
                </h1>
                <div>
                    <h3 className="text-md sm:text-lg font-semibold">
                        Your One-Stop Shop for Electronics!{" "}
                        <span className="text-2xl">🚀</span>
                    </h3>
                    <p className="text-[15px] sm:text-md font-bold sm:text-gray-600 mb-12">
                        Shop the latest{" "}
                        <span className="font-bold text-black">
                            laptops, desktops, printers, copiers, and fax
                            machines
                        </span>{" "}
                        at unbeatable prices. Upgrade your tech, boost
                        productivity, and shop with confidence. 🌿
                    </p>
                </div>

                <div className="bottom-36 bg-gray-100 p-3 rounded-md left-6 block">
                    <div className="flex gap-5">
                        <div className="rounded-md font-bold font-inter text-gray-500 text-center md:text-start">
                            <span className="absolute -top-2 -left-2">✨</span>
                            <h1> Trusted by over 35,0000+ Clients</h1>
                            <h1>worldwide since 2012</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden absolute -z-10">
                <Image
                    src="/heroCover.gif"
                    alt="product"
                    width={450}
                    height={350}
                    className="mx-5 min-w-56 opacity-10"
                />
            </div>
        </section>
    );
};

export default Hero;
