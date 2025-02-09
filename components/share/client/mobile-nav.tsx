"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CLIENT_NAV_ITEMS } from "@/constants";

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
            <SheetContent className="w-[270px]">
                <SheetTitle className="hidden">Title</SheetTitle>
                <nav className="flex justify-between flex-col h-full">
                    <ul className="flex flex-col gap-3">
                        {CLIENT_NAV_ITEMS.map((item) => (
                            <li key={item.title}>
                                <Button asChild>
                                    <Link className="w-full" href={item.href}>
                                        {item.title}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-3">
                        <Button asChild>
                            <Link href="/sign-in" className="">
                                Sign In
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
