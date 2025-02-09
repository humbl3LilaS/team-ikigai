'use client'
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
import { adminSideBarItems } from "@/constants";
import { usePathname } from "next/navigation";
import AdminSidebarFooter from "./admin-side-bar-footer";

const AppSideBar = () => {
    const path = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminSideBarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton size='lg' asChild isActive={path == item.url ? true : false}>
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-2 p-2"
                                        >
                                            {/* {React.createElement(item.icon, {
                                                className: "w-5 h-5",
                                            })} */}
                                            <span>{item.icon}</span>
                                            <span>{item.title}</span>
                                        </a>
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
