import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import AdminSidebarFooter from "./admin-side-bar-footer";
// import AdminSidebarItems from "./admin-side-bar-Items";
const AdminSidebarItems = dynamic(() => import("./admin-side-bar-Items"),
    {
        ssr: false,
        loading: () =>
            <div className="hidden md:flex flex-col w-[240px] items-center gap-3 mt-3 pl-2">
                {Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="w-full h-12" />)}
            </div>,
    });

const AppSideBar = () => {
    const path = usePathname();
    const session = useSession();
    const role = session?.data?.user.role;

    return (
        <Sidebar collapsible="icon" className="print:hidden">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Link href={"/"}>
                            <Image
                                src="/brandLogo.png"
                                width={54}
                                height={34}
                                alt="logo"
                                className="dark:invert dark:saturate-0"
                            />
                        </Link>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <AdminSidebarItems role={role!} path={path} />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <AdminSidebarFooter />
        </Sidebar>
    );
};

export default AppSideBar;
