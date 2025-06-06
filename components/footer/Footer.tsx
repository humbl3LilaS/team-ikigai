import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex w-full max-w-screen-2xl mx-auto flex-col gap-3 px-6 mt-12">
            <div className="flex justify-between items-center gap-8">
                <div className="flex-1 h-[0.1px] bg-gray-200" />
                <h1 className="line-clamp-1 text-sm font-semibold">
                    MYANTECH STORE
                </h1>
                <div className="flex-1 h-[0.1px] bg-gray-200" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex flex-1 p-2 items-center sm:items-center md:items-start flex-col xs:flex-row xs:justify-between sm:flex-col gap-2">
                    <Link href="/policy" className="text-[11px] sm:text-sm">
                        PRIVACY POLICY
                    </Link>
                    <Link href="/terms" className="text-[11px] sm:text-sm">
                        TERMS & CONDIIONS
                    </Link>
                    <Link href="/about" className="text-[11px] sm:text-sm">
                        ABOUT
                    </Link>
                </div>

                <div className="flex gap-3 p-2 justify-center">
                    <Facebook className="p-2 rounded-full bg-blue-600 size-8 sm:size-10 text-white" />
                    <Instagram className="p-2 rounded-full bg-red-500 size-8 sm:size-10 text-white" />
                    <Twitter className="p-2 rounded-full bg-black size-8 sm:size-10 text-white" />
                </div>

                <div className="flex flex-col p-2 flex-1 gap-2 sm:items-end items-center">
                    <Link
                        href="/shipping-info"
                        className="text-[11px] sm:text-sm"
                    >
                        SHIPPING INFO
                    </Link>
                    <Link href="/exchange" className="text-[11px] sm:text-sm">
                        RETURN / EXCHANGES
                    </Link>
                    <Link href="/contact" className="text-[11px] sm:text-sm">
                        CONTACT
                    </Link>
                </div>
            </div>
            <div className="mx-auto">
                <p className="text-[10px] sm:text-sm text-gray-400">
                    @2025 MYANTECH. All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
