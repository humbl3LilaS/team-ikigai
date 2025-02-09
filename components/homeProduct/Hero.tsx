import Image from "next/image";
import React from "react";

const Hero = () => {
    return (
        <section className="flex gap-1 md:mx-20 sm:gap-16 p-3 sm:p-5 relative">
            <div className="hidden sm:block">
                <Image
                    src="/heroCover.png"
                    alt="product"
                    width={450}
                    height={350}
                    className="mx-5 min-w-56"
                />
            </div>
            <div className="max-w-[350px] sm:max-w-[450px] mt-8 font-inter min-h-full rounded-md p-3 lg:p-6 relative">
                <h1 className="text-4xl pb-3 font-extrabold text-blue-600 -ms-1">
                    Product Title
                </h1>
                <h3 className="text-lg font-semibold">Product subtitle</h3>
                <p className="text-md sm:text-lg font-bold sm:text-gray-600">
                    Looking for the perfect floral touch to brighten your day?
                    Our handcrafted bouquets are designed with love, bringing
                    fresh, vibrant 🌿
                </p>

                <div className="absolute bottom-36 bg-gray-100 p-3 rounded-md left-6 hidden lg:block">
                    <div className="flex gap-5">
                        <div className=" rounded-md font-bold font-inter text-gray-500">
                            <span className="absolute -top-2 -left-2">✨</span>
                            <h1> Trusted by over 35,0000+ Clients</h1>
                            <h1>worldwide since 2012</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden absolute -z-10 right-32 max-w-36">
                <Image
                    src="/heroCover.png"
                    alt="product"
                    width={450}
                    height={350}
                    className="mx-5 min-w-56"
                />
            </div>
        </section>
    );
};

export default Hero;
