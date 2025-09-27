import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { DialogContainer } from "~/components/blocks/dialog-container";
import { Sidebar } from "~/components/layouts/app/sidebar";
import { DialogStoreProvider } from "~/components/providers/dialog-store-provider";
import { QueryProvider } from "~/components/providers/query-provider";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { fetchUser } from "~/lib/auth";

type Props = Readonly<{ children: React.ReactNode }>;

export default async function AppLayout({ children }: Props) {
  const user = await fetchUser();

  return (
    <>
      <QueryProvider>
        <DialogStoreProvider>
          <SidebarProvider style={{ "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}>
            <Sidebar variant="inset" userName={user.name} userEmail={user.email} userImage={user.image} />
            <SidebarInset className="container">{children}</SidebarInset>
          </SidebarProvider>

          <DialogContainer />
        </DialogStoreProvider>

        <ReactQueryDevtools />
      </QueryProvider>
    </>
  );
}
