import Image from "next/image";
import React from "react";

const AboutPage = () => {
    return (
        <section className="p-5">
            <div className="flex items-center justify-center">
                <h3 className="text-3xl font-bold">About Us</h3>
            </div>

            <div className="block md:flex items-center md:p-10 gap-10 pb-4">
                <div className="w-full flex items-center justify-center p-4">
                    <Image
                        src={"/about-us/Myantech.png"}
                        alt="MyanTech"
                        className="w-full max-w-md"
                    />
                </div>
                <div>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-center md:pb-2">
                        <span className="text-sm md:text-2xl">Welcome to</span>
                        <h1 className="font-bold text-3xl md:text-5xl">
                            &nbsp; MyanTech
                        </h1>
                    </div>
                    <p className="text-xs md:text-lg mt-2">
                        Your trusted local partner for cutting-edge ICT products
                        and solutions. As a leading importer and e-commerce
                        platform, we specialize in bringing the latest
                        technology to businesses and individuals across Myanmar.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-6 w-full justify-evenly">
                <div
                    className="py-20 flex w-full items-center justify-evenly p-4 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/about-us/who_we_are.png')",
                    }}
                >
                    <div className="bg-white p-6 border w-full md:w-1/3 lg:w-1/4     border-neutral-200 bg-opacity-85">
                        <h2 className="font-bold text-xl md:text-2xl text-center mb-2">
                            Who We Are
                        </h2>
                        <p className="text-xs md:text-lg">
                            MyanTech was founded with a vision to bridge the gap
                            between global innovation and local needs. We
                            provide a comprehensive range of ICT products,
                            including laptops, desktops, networking equipment,
                            software solutions, and accessories from top
                            international brands.
                        </p>
                    </div>
                </div>
            </div>

            <div className="my-10 md:my-20 flex justify-evenly items-center w-full gap-6">
                <div className="bg-white w-full md:w-1/3 border border-neutral-200 md:border-0  p-6 md:py-5">
                    <h2 className="font-bold text-xl md:text-2xl text-center mb-2">
                        What We Do?
                    </h2>
                    <p className="text-xs md:text-lg">
                        We are transforming ICT commerce with an automated
                        e-commerce platform offering easy ordering, real-time
                        inventory tracking, automated logistics, and integrated
                        customer support.
                    </p>
                </div>
                <div className="w-1/3 hidden md:block">
                    <Image
                        src={"/about-us/what_we_do.png"}
                        alt="what we do"
                        className=""
                    />
                </div>
            </div>

            <div className="my-10 md:my-20 flex justify-evenly items-center w-full gap-6">
                <div className="w-1/3 hidden md:block">
                    <Image
                        src={"/about-us/why_choose_us.png"}
                        alt="why choose us"
                        className=""
                    />
                </div>
                <div className="bg-white w-full md:w-1/3 border border-neutral-200 md:border-0  p-6 md:py-5">
                    <h2 className="font-bold text-xl md:text-2xl text-center mb-2">
                        Why Choose Us?
                    </h2>
                    <p className="text-xs md:text-lg">
                        ✔ Reliable & authentic products
                        <br />
                        ✔ Competitive pricing
                        <br />
                        ✔ Efficient B2B & B2C services
                        <br />
                        ✔ Tech-driven convenience
                        <br />
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
