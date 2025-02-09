"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import AppSideBar from "@/components/share/admin/app-side-bar";
import DashboardBreadcrumb from "@/components/share/admin/dashboard-breadcrumb";

export function AdminSideBar({ children }: { children: ReactNode }) {
    const isOpen = useSidebarState((state) => state.isOpen);
    const toggleSideBar = useSidebarState((state) => state.toggleOpen);
    return (
        <SidebarProvider open={isOpen} onOpenChange={toggleSideBar}>
            <AppSideBar />
            <main className={"flex-1"}>
                <header className="flex items-center gap-x-4">
                    <SidebarTrigger className={"size-10"} />
                    <DashboardBreadcrumb />
                </header>
                {children}
            </main>
        </SidebarProvider>
    );
}
