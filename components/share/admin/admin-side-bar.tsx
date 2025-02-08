"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import AppSideBar from "@/components/share/admin/app-side-bar";

export function AdminSideBar({ children }: { children: ReactNode }) {
    const isOpen = useSidebarState((state) => state.isOpen);
    const toggleSideBar = useSidebarState((state) => state.toggleOpen);
    return (
        <SidebarProvider open={isOpen} onOpenChange={toggleSideBar}>
            <AppSideBar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
