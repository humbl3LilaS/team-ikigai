"use client";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Logout() {
  return (
    <section className="">
      <Button onClick={() => signOut()} variant="destructive" className="mx-auto block mt-5 px-5">Logout</Button>
    </section>
  );
}
