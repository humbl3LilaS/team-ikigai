import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
    title: "Ikigai Store",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
