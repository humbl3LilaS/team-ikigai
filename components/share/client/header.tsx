"use client";

import { Search, ShoppingCartIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ProductSearch from "@/components/searchs/product-search";

import MobileNav from "./mobile-nav";

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
        <nav className="flex justify-between gap-2 bg-white items-center text-white p-4 sm:px-10 sm:py-6">
            <div className="cursor-pointer">
                <Image
                    src="/brandLogo.png"
                    width={72}
                    height={30}
                    alt="logo"
                    className=""
                />
            </div>

            <div className={`sm:hidden max-w-md`}>
                <ProductSearch />
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

                <button className="bg-transparent cursor-pointer hover:bg-transparent shadow-none text-blue-500" onClick={handleSearch}>
                    <Search className="size-6"/>
                </button>
                <button  className="bg-transparent cursor-pointer hover:bg-transparent shadow-none text-blue-500">
                    <ShoppingCartIcon className="size-6" />
                </button>
                <button className="bg-transparent cursor-pointer hover:bg-transparent shadow-none text-blue-500">
                    <User className="size-6" />
                </button>
            </div>
        </nav>
    );
};

export default Header;
