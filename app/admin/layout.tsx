import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { AdminSideBar } from "@/components/share/admin/admin-side-bar";
import { ThemeProvider } from "@/components/share/admin/theme-provider";

export const metadata: Metadata = {
    title: "Myan Tech Admin Page",
    description: "Myan Tech Company Admin Page",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (!session || session.user.role === "USER") {
        redirect("/");
    }
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
            >
                <AdminSideBar>{children}</AdminSideBar>
            </ThemeProvider>
        </SessionProvider>
        );
}
