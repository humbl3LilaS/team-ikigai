import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import CartLink from "@/components/share/client/cart-link";

import MobileNav from "./mobile-nav";

const Header = async () => {
    const session = await auth();
    return (
        <nav className="flex max-h-32 justify-between gap-2 bg-white items-center text-white p-4 sm:px-10 sm:py-6">
            <Link href={"/"}>
                <Image src="/brandLogo.png" width={72} height={30} alt="logo" />
            </Link>

            <div className="md:hidden">
                <MobileNav />
            </div>

            <div className="hidden md:flex justify-between gap-5">
                <div
                    className={`gap-5 items-center text-black hidden sm:flex font-semibold`}
                >
                    <Link href="/">Home</Link>
                    <Link href="/about" className="">
                        About
                    </Link>
                    <Link href="/contact" className="">
                        Contact Us
                    </Link>
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
                            className="text-black hidden sm:flex font-semibold py-1 px-2 text-[16px] items-center border-2 hover:black hover:text-blue-500 hover:bg-transparent rounded-sm"
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
