"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { CarTaxiFrontIcon, Search, User } from "lucide-react";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";
import ProductSearch from "@/components/searchs/product-search";

const Header = () => {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const handleSearch = () => {
        if (!isSearchOpen) {
            setIsSearchOpen(!isSearchOpen);
        }
        // implement searching function here
    };
    return (
        <nav className="flex justify-between items-center text-white p-4 sm:p-6">
            <div className="cursor-pointer">
                <Image
                    src="/brandLogo.png"
                    width={72}
                    height={45}
                    alt="logo"
                    className=""
                />
            </div>

            <div className="sm:hidden">
                <MobileNav />
            </div>

            <div className="hidden sm:flex gap-5">
                <div
                    className={`${isSearchOpen ? "sm:hidden" : ""} gap-5 items-center text-black hidden sm:flex font-semibold`}
                >
                    <Link
                        href="/"
                        className={`${pathname === "/" ? "underline underline-offset-4" : ""}`}
                    >
                        Home
                    </Link>
                    <Link href="/about" className="">
                        About
                    </Link>
                    <Link href="/contact" className="">
                        Contact Us
                    </Link>
                </div>
                {isSearchOpen && <ProductSearch />}

                <Button className="" onClick={handleSearch}>
                    <Search />
                </Button>
                <Button className="">
                    <CarTaxiFrontIcon />
                </Button>
                <Button className="">
                    <User />
                </Button>
            </div>
        </nav>
    );
};

export default Header;
