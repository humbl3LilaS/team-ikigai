import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/query-provider";

const inter = localFont({
    src: "/fonts/InterVF.ttf",
    variable: "--font-inter",
    weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
    src: "/fonts/SpaceGroteskVF.ttf",
    variable: "--font-space-grotesk",
    weight: "500 600 700 800 900",
});

const oswald = localFont({
    src:"/fonts/Oswald-VariableFont_wght.ttf",
    variable:"--font-oswald",
    weight:"200 300 400 500 600 700",
});

export const metadata: Metadata = {
    title: "MyanTech Store",
    description:
        "Shop top-quality laptops, desktops, printers, copiers, and more at MyanTech. Your one-stop destination for the latest electoronics at unbeatable prices!",
    openGraph: {
        title: "MyanTech Store",
        description: "Best place to buy electronic devices online",
        images: ["/logos/logo.svg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} ${spaceGrotesk.variable} ${oswald.variable} antialiased`}
            >
                <QueryProvider>
                    <SessionProvider>{children}</SessionProvider>
                </QueryProvider>
                <Toaster />
                <Sonner />
            </body>
        </html>
    );
}
