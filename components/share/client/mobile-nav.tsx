"use client";

import { LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CLIENT_NAV_ITEMS } from "@/constants/ui-constants";

const MobileNav = () => {
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
                    <Button className="bg-gray-300 hover:bg-blue-200 hover:text-white hover:font-bold text-black font-bold flex gap-2">
                        <LogOut />
                        <Link href="/sign-in" className="">
                            Logout
                        </Link>
                    </Button>
                    <Button className="bg-gray-300 hover:bg-blue-200 hover:text-white hover:font-bold text-black font-bold flex gap-2">
                        <User />
                        <Link href="/sign-up">Login</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
