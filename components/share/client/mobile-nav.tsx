"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CLIENT_NAV_ITEMS } from "@/constants";
import Link from "next/link";

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
            <SheetContent>
                <SheetHeader className={"sr-only"}>Mobile Menu</SheetHeader>
                <nav>
                    <ul>
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
