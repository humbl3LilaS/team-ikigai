"use client";

import { LogOut, Menu, ShoppingCartIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CLIENT_NAV_ITEMS } from "@/constants/ui-constants";

const MobileNav = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return (
        <Sheet>
            <SheetTrigger
                asChild={true}
                className={"md:hidden bg-black text-white"}
            >
                <Button variant={"link"} className={"size-full"}>
                    <Menu className={"size-20"} />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[270px] flex flex-col justify-between">
                <SheetTitle className="hidden">title</SheetTitle>
                <nav className="flex justify-between flex-col">
                    <Image
                        src="/brandLogo.png"
                        alt="logo"
                        width={80}
                        height={35}
                        className=""
                    />
                    <ul className="flex flex-col gap-3 mt-5">
                        {CLIENT_NAV_ITEMS.map((item) => (
                            <li key={item.title}>
                                <Button
                                    asChild
                                    className="bg-tansparent shadow-none border border-blue-200 text-blue-600 hover:bg-blue-200 hover:text-white hover:font-bold"
                                >
                                    <Link className="w-full" href={item.href}>
                                        {item.title}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex flex-col gap-3">
                    {isLoggedIn ? (
                        <>
                            <Button
                                className="bg-gray-300 hover:bg-blue-200 hover:text-white hover:font-bold text-black font-bold flex gap-2"
                                asChild={true}
                            >
                                <Link href="/profile">
                                    <User />
                                    Profile
                                </Link>
                            </Button>
                            <Button
                                className="bg-gray-300 hover:bg-blue-200 hover:text-white hover:font-bold text-black font-bold flex gap-2"
                                onClick={async () => {
                                    await signOut({ redirectTo: "/" });
                                }}
                            >
                                <LogOut />
                                <span>Logout</span>
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="bg-gray-300 hover:bg-blue-200 hover:text-white hover:font-bold text-black font-bold flex gap-2"
                            asChild={true}
                        >
                            <Link href="/sign-in">
                                <User />
                                Login
                            </Link>
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
