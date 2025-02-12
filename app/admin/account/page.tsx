import { LinkIcon, User } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import { AdminAccountForm } from "@/features/admin/account/component";

export default async function AccountPage() {
  const session = await auth();

  const links = adminSideBarItems.filter(data => session?.user.role && data.role.includes(session.user.role));

  return (
    <section className="p-3">
      <section className="flex items-center flex-col gap-2">
        <div className="size-24 rounded-full bg-muted flex items-center justify-center border-2 border-muted-foreground/20">
          <User className="text-7xl size-14 text-muted-foreground" />
        </div>
        <div className="flex">
          <h1 className="">{session?.user.name}</h1>
          <p className="bg-muted px-2 py-0.5 rounded-md text-xs ml-2 cursor-default select-none">{session?.user.role}</p>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <AdminAccountForm currentUsername={session?.user.name || ""} />
      </section>

      <div className="mt-5 grid grid-cols-3 bg-muted/50 rounded gap-5 p-3 place-items-center max-w-screen-sm mx-auto">
        {links.map(link => (
          <div className="flex" key={link.title}>
            <Link href={link.url} className="flex items-center gap-1 hover:text-blue-500">
              {link.title} <LinkIcon size={12} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
