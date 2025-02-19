"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronUp, User2 } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

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
import { Skeleton } from "@/components/ui/skeleton";
import { getUserNameFromDb } from "@/dashboard/actions";

export default function AdminSidebarFooter() {
  const { setTheme } = useTheme();
  const session = useSession();
  const userId = session.data?.user.id;
  const role = session.data?.user.role;

  const { data, isLoading } = useQuery({
    queryKey: ["dbId"],
    queryFn: () => getUserNameFromDb(userId!) || session.data?.user.name,
    staleTime: 1000 * 60 * 30,
    enabled: !!userId,
  });

  // console.log(session.data?.user.id);

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 />
                {isLoading ?
                  <Skeleton className="w-full h-full" /> :
                  <span>{data?.name} ({role == "WAREHOUSE_MANAGER" ? "WAREHOUSE MANAGE" : role})
                  </span>
                }
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
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Switch Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
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
