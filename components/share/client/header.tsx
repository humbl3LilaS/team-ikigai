"use client";

import { Search, ShoppingCartIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import ProductSearch from "@/components/searchs/product-search";
import { Button } from "@/components/ui/button";

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
    const { data: session } = useSession();

    return (
        <nav className="flex justify-between gap-2 bg-white items-center text-white p-4 sm:px-10 sm:py-6">
            <Link href={"/"}>
                <Image
                    src="/brandLogo.png"
                    width={72}
                    height={30}
                    alt="logo"
                    className=""
                />
            </Link>

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

                <Button
                    className="bg-transparent text-black border"
                    onClick={handleSearch}
                >
                    <Search />
                </Button>
                <Button className="bg-transparent text-black border">
                    <ShoppingCartIcon />
                </Button>
                {session?.user && (
                    <Link
                        href={"/profile"}
                        className="bg-transparent text-black border px-2 py-1 rounded-sm gap-5 items-center font-semibold hidden sm:flex hover:bg-neutral-800"
                    >
                        <User />
                    </Link>
                )}
                {!session?.user && (
                    <Link
                        href={"/sign-up"}
                        className="text-black hidden sm:flex font-semibold px-4 py-1 items-center border-2 border-black hover:black hover:text-white hover:bg-black rounded-sm"
                    >
                        Get started
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
