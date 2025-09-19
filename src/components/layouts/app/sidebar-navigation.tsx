"use client";

import { HandCoinsIcon, HomeIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const items = [
  { title: "Dashboard", href: "/app/dashboard", icon: LayoutDashboardIcon },
  { title: "Households", href: "/app/households", icon: HomeIcon },
  { title: "Payments", href: "/app/payments", icon: HandCoinsIcon },
];

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} isActive={pathname.startsWith(item.href)} asChild>
                <Link href={item.href}>
                  <item.icon />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
