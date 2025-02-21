import Link from "next/link";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { adminSideBarItems } from "@/constants/ui-constants";

export default function AdminSidebarItems({ role, path }: { role: string, path: string }) {
  return (
    <SidebarMenu>
      {adminSideBarItems.filter(item => item.role.includes(role!)).map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            size="lg"
            asChild
            isActive={
              path == item.url
            }
            tooltip={item.title}
          >
            <Link
              href={item.url}
              className="flex items-center gap-2"
            >
              <span>{<item.icon />}</span>
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

      ))}
    </SidebarMenu>
  );
}
