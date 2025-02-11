"use client";
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
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminSideBarItems } from "@/constants/ui-constants";

import AdminSidebarFooter from "./admin-side-bar-footer";

const AppSideBar = () => {
    const path = usePathname();
    const auth = useSession();

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{auth.data?.user.role} Department</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminSideBarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        size="lg"
                                        asChild
                                        isActive={
                                            path == item.url ? true : false
                                        }
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-2 p-2"
                                        >
                                            {/* {React.createElement(item.icon, {
                                                className: "w-5 h-5",
                                            })} */}
                                            <span>{item.icon}</span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <AdminSidebarFooter />
        </Sidebar>
    );
};

export default AppSideBar;
