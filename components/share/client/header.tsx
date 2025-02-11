"use client";

import { Search, ShoppingCartIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import ProductSearch from "@/components/searchs/product-search";
import { Button } from "@/components/ui/button";
import { ProductProvider } from "@/features/category/contexts/product-context";
import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";

import MobileNav from "./mobile-nav";

const Header = () => {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const cart = useCartStore((state)=>state.cart);
    const totalQuantities = cart.reduce((sum,item)=> sum + item.q , 0);
    const chars = totalQuantities.toString().slice();
    
    const handleSearch = () => {
           if(isSearchOpen){
            setIsSearchOpen(!isSearchOpen);
           }
    };

    const { data: session } = useSession();

    return (
        <nav className="flex max-h-32 justify-between gap-2 bg-white items-center text-white p-4 sm:px-10 sm:py-6">
            <Link href={"/"}>
                <Image
                    src="/brandLogo.png"
                    width={72}
                    height={30}
                    alt="logo"
                    className=""
                />
            </Link>

            <div className={`flex bg-black/25 gap-2 md:hidden px-2 items-center rounded-lg`}>
                <Search/>
                {!isSearchOpen && <input onFocus={()=>setIsSearchOpen(true)} className="bg-transparent peer text-black focus:outline-none py-1 w-full" />}
                {isSearchOpen && <ProductProvider><ProductSearch handleSearch={handleSearch} /></ProductProvider>}
            </div>

            <div className="md:hidden">
                <MobileNav />
            </div>

            <div className="hidden md:flex justify-between gap-5">
                <div
                    className={`gap-5 items-center text-black hidden sm:flex font-semibold`}
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
                {isSearchOpen && 
                <div className="hidden sm:block">
                    <ProductProvider>
                    <ProductSearch handleSearch={handleSearch}  />
                    </ProductProvider>
                </div>}

                <Button
                    className="bg-transparent hover:bg-transparent hover:text-blue-500 text-black border"
                    onClick={()=>setIsSearchOpen(!isSearchOpen)}
                >
                    <ProductProvider><Search /></ProductProvider>
                </Button>
                <Button className="bg-transparent text-black hover:bg-transparent hover:text-blue-500 relative border">
                    <ShoppingCartIcon />
                    {totalQuantities > 0 && <span className={`absolute -top-2 w-5 h-5 -right-2 text-white bg-red-500 rounded-full ${chars.length < 3 ? "text-[12px]" : "text-[10px]"} `}>{totalQuantities}</span>}
                </Button>
                {session?.user && (
                    <Link
                        href={"/profile"}
                        className="bg-transparent text-black border px-2 py-1 rounded-sm gap-5 items-center font-semibold hidden sm:flex hover:bg-white hover:text-blue-500"
                    >
                        <User className="size-6" />
                    </Link>
                )}
                {!session?.user && (
                    <Link
                        href={"/sign-up"}
                        className="text-black hidden sm:flex font-semibold py-1 px-2 text-[16px] items-center border-2 hover:black hover:text-blue-500 hover:bg-transparent rounded-sm"
                    >
                        Get started
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
