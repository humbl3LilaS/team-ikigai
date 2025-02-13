"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function NotFound() {
  return (
    <section className="w-full flex-col gap-2 h-dvh flex items-center justify-center">
      <Image src="/brandLogo.png" alt="Myan Tech Logo" width={100} height={64} className="opacity-50" />
      <h1 className="text-2xl font-extrabold">404 - NOT FOUND</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist.</p>
      <p className="">
        Go back to {" "}
        <Link href="/" className="font-bold hover:underline text-blue-500">Home</Link>
      </p>
    </section>
  );
}
