"use client";

import { ChevronUp, User2 } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUserNameFromDb } from "@/dashboard/actions";

export default function AdminSidebarFooter() {
  const { setTheme } = useTheme();
  const session = useSession();
  const [userName, setUserName] = useState(session.data?.user.name);

  useEffect(() => {
    if (session.data?.user.id) {
      getUserNameFromDb(session.data?.user.id).then(name => setUserName(name.name));
    }
  }, [userName, setUserName, session.data?.user.id]);

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> {userName?.toString()}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <Link className="w-full h-full text-left" href="/admin/account">Account</Link>
              </DropdownMenuItem >
              {/* <DropdownMenuItem> */}
              {/* <button className="w-full h-full text-left" type="button" onClick={switchTheme}>Switch Theme</button> */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Switch Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* </DropdownMenuItem> */}
              <DropdownMenuItem>
                <button type="button" className="w-full text-left" onClick={() => signOut()}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
