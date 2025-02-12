import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import ProductSearch from "@/components/searchs/product-search";
import CartLink from "@/components/share/client/cart-link";
import { ProductProvider } from "@/features/client/category/contexts/product-context";

import MobileNav from "./mobile-nav";
import RouteLink from "./route-link";

const Header = async () => {
    const session = await auth();
    return (
        <nav className="flex max-h-32 justify-between select-none gap-7 md:gap-2 py-4 sm:px-8 px-3 bg-white items-center text-white">
            <div className="text-black hidden md:flex font-semibold md:gap-5 lg:gap-8">
                <RouteLink />
            </div>

            <Link href={"/"}>
                <Image src="/brandLogo.png" width={72} height={30} alt="logo" />
            </Link>

            <div className="md:hidden">
                <MobileNav isLoggedIn={!!session} />
            </div>

            <div className="hidden md:flex justify-between gap-5">
                <div
                    className={`gap-5 items-center text-black hidden sm:flex font-semibold`}
                >
                    <ProductProvider>
                        <div className="hidden md:block">
                            <ProductSearch />
                        </div>
                    </ProductProvider>

                    <CartLink />
                    {session ? (
                        <Link
                            href={"/profile"}
                            className="bg-transparent text-black border px-2 py-1 rounded-sm gap-5 items-center font-semibold hidden sm:flex hover:bg-white hover:text-blue-500"
                        >
                            <User className="size-6" />
                        </Link>
                    ) : (
                        <Link
                            href={"/sign-up"}
                            className="text-black hidden sm:flex font-semibold py-1.5 px-3 text-[14px] items-center border hover:black hover:text-blue-500 hover:bg-transparent rounded-sm"
                        >
                            Get started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
