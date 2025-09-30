"use client";

import { HandCoinsIcon, HomeIcon, LayoutDashboardIcon } from "lucide-react";
import { useTranslations } from "next-intl";
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
  { key: "dashboard", href: "/app/dashboard", icon: LayoutDashboardIcon },
  { key: "households", href: "/app/households", icon: HomeIcon },
  { key: "payments", href: "/app/payments", icon: HandCoinsIcon },
] as const;

export function SidebarNavigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const title = t(item.key as (typeof items)[number]["key"]);
            return (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton tooltip={title} isActive={pathname.startsWith(item.href)} asChild>
                  <Link href={item.href}>
                    <item.icon />
                    {title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
