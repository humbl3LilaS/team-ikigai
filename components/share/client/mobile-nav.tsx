"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CLIENT_NAV_ITEMS } from "@/constants";
import Link from "next/link";

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild={true} className={"md:hidden"}>
                <Button>
                    <Menu className={"size-6"} />
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
