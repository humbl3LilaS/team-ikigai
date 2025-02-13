"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const RouteLink = () => {
    const pathname = usePathname();
  return (
    <>
        <Link href="/" className={`${pathname === "/" && "font-semibold"} text-[#2c3e50] tracking-wider text-[15px]`}>
            Home
        </Link>

        <div className="w-[1px] bg-[#b4b4b4] opacity-45 py-2" />

        <Link href="/category" className={`${pathname === "/category" && "font-semibold"} text-[#2c3e50] tracking-wide text-[15px]`}>
            Shop
        </Link>

        <div className="w-[1px] bg-[#b4b4b4] opacity-45" />

        <Link href="/about" className={`${pathname === "/about" && "font-semibold"} text-[#2c3e50] tracking-wide text-[15px]`}>
            About
        </Link>

        <div className="w-[1px] bg-[#b4b4b4] opacity-45" />

        <Link href="/contact" className={`${pathname === "/contact" && "font-semibold"} text-[#2c3e50] tracking-wide text-[15px]`}>
            Contact
        </Link>


        
    </>
  );
};

export default RouteLink;