import Image from "next/image";
import Link from "next/link";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarUser } from "./sidebar-user";

type Props = React.ComponentProps<typeof SidebarComponent> & {
  userName: string;
  userEmail: string;
  userImage?: string | null;
};

export function Sidebar({ userName, userEmail, userImage, ...props }: Props) {
  return (
    <SidebarComponent collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 data-[slot=sidebar-menu-button]:!p-1.5" asChild>
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={512} height={512} className="!size-8" />
                <span className="text-base font-semibold">Utilities Tracker</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser userName={userName} userEmail={userEmail} userImage={userImage} />
      </SidebarFooter>
    </SidebarComponent>
  );
}
