import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
    return (
        <div className="flex max-w-7xl mx-auto flex-col gap-5">
            <section className="relative p-5 grid grid-cols-12 gap-4">
                <div className="col-span-12 xs:col-span-8 sm:col-span-8 flex flex-row flex-wrap sm:flex-col gap-6 md:gap-8 lg:gap-10">
                    <div className="">
                        <h1 className="transition-all flex-nowrap lg:text-nowrap text-5xl sm:text-6xl lg:text-7xl leading-tight duration-500 text-[#2a384b] font-oswald font-extrabold">
                            Get Your Best
                            <br />
                            <span
                                className="text-transparent bg-clip-text font-bold"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, #e09dd3 10%, #dcabd4 5%, #dbaed5 90%)",
                                }}
                            >
                                Gadget {""}
                            </span>
                            Everywhere
                        </h1>
                    </div>
                    <div className="text-[18px] scale-y-75 text-[#bebebe] font-oswald">
                        <p>
                            The most complete gadget marketplace in the nation.
                        </p>
                        <p>Get 30% off your first purchase</p>
                    </div>
                </div>

                <div className="xs:col-span-4 sm:col-span-4 relative hidden h-fit xs:block md:absolute md:-top-4 md:right-0 md:scale-75 lg:mt-4 lg:scale-100 lg:right-4">
                    <Image
                        width={300}
                        height={300}
                        src="/pcAds.png"
                        alt="advertise"
                        className="drop-shadow-2x -top-9 aspect-[1/1.5] sm:aspect-[1/1.2] scale-100 md:aspect-[1/1.05]"
                    />

                    <div className="bg-conic-custom absolute top-2 left-0 lg:-top-2 lg:right-20 blur-3xl rounded-full opacity-70 -z-10 w-52 h-60 md:w-64 md:h-72 lg:w-80 lg:h-96 -skew-x-12" />
                </div>
            </section>

            <section className="grid  grid-cols-12 ">
                <div className="relative w-full col-span-3">
                    <Link
                        href="/category"
                        className="px-4 brightness-105 w-fit h-fit py-3 text-white rounded-xl border border-white text-nowrap bg-gradient-to-br from-[#b88bd0] via-[#afa5de] to-[#a8cff2] font-bold"
                    >
                        Shop Now
                    </Link>
                    <div className="bg-conic-custom absolute -left-2 -top-5 blur-3xl rounded-full -z-10 w-40 h-20 -skew-x-12" />
                </div>

                <div className="relative col-span-9 sm:col-span-5 pe-5 justify-self-end xs:justify-self-center scale-90 sm:scale-95 lg:scale-100 sm:me-0 border-[1px] w-fit xs:w-[240px] -mt-8 sm:mt-0 border-white lg:w-[270px] justify-between flex p-2 md:p-3 lg:p-4 rounded-2xl bg-[#FFFAFA] shadow-md">
                    <Image
                        src="/laptopAds.png"
                        width={150}
                        height={100}
                        alt="laptop"
                        className="absolute scale-x-[-1]  max-w-[150px] aspect-[1/0.8] drop-shadow-2xl -top-12 flex-1 xs:-top-10 -left-3 xs:left-3 transition-hero object-cover hidden xs:block w-fit xs:w-full"
                    />
                    <div className="hidden xs:block" />
                    <div className="flex flex-col text-end justify-self-end gap-1 md:gap-2 lg:gap-3">
                        <h1 className="text-[#df9fd2] font-bold tracking-wider">
                            PROMO
                        </h1>
                        <div className="text-sm">
                            <h1 className="font-bold text-[#2a384b] ">
                                Laptop 1.8v
                            </h1>
                            <p className="text-xs mt-2 text-[#c1c1c1] font-semibold">
                                RAM 8GB | Display 11.6&quot; |
                            </p>
                            <p className="text-xs text-[#c1c1c1] font-semibold">
                                2.5GZ | 512 GB SSD
                            </p>
                        </div>
                    </div>

                    <div className="bg-conic-custom absolute -top-16 -left-10 size-40  rounded-full -z-50 opacity-80 blur-3xl" />
                </div>
            </section>
        </div>
    );
};

export default Hero;
