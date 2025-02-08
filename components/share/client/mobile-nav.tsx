"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CLIENT_NAV_ITEMS } from "@/constants";
import Link from "next/link";

const MobileNav = () => {
    console.log("mobile nav");
    return (
        <Sheet>
            <SheetTrigger asChild={true} className={"md:hidden"}>
                <Button variant={"link"} className={"size-12"}>
                    <Menu className={"size-full"} />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <nav>
                    <ul>
                        {CLIENT_NAV_ITEMS.map((item) => (
                            <li key={item.title}>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
