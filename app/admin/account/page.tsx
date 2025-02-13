import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import { getUserNameFromDb } from "@/dashboard/actions";
import { AdminAccountForm } from "@/features/admin/account/component";
import { LogoutBtn } from "@/features/admin/account/logout-btn";

export default async function AccountPage() {
  const session = await auth();

  if (session?.user.role == "USER") {
    notFound();
  }
  const getUserName = session && await getUserNameFromDb(session?.user.id);

  const links = adminSideBarItems.filter(data => session?.user.role && data.role.includes(session.user.role));

  return (
    <section className="p-3 h-[calc(100dvh-40px)] flex flex-col justify-between">
      <section className="">
        <section className="flex items-center flex-col gap-2">
          <div className="size-24 rounded-full bg-muted overflow-hidden flex items-center justify-center border-2 border-muted-foreground/20">
            {/* <User className="text-7xl size-14 text-muted-foreground" /> */}
            <Image draggable={false} src={`https://robohash.org/${session?.user.id}?set=set3`} alt="user avatar" width={96} height={96} />
          </div>
          <div className="flex">
            <h1 className="">{getUserName?.name}</h1>
            <p className="bg-muted px-2 py-0.5 rounded-md text-xs ml-2 cursor-default select-none">{session?.user.role}</p>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <AdminAccountForm currentUsername={getUserName?.name || ""} />
        </section>

        <LogoutBtn />

      </section>


      <footer className="mt-5 grid grid-cols-3 bg-muted/50 rounded gap-5 p-3 place-items-center w-full max-w-screen-lg mx-auto">
        {links.map(link => (
          <div className="flex" key={link.title}>
            <Link href={link.url} className="flex items-center hover:text-blue-500">
              {link.title} <ArrowUpRight size={14} />
            </Link>
          </div>
        ))}
      </footer>
    </section>
  );
}
