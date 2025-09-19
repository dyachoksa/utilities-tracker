import { Sidebar } from "~/components/layouts/app/sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { fetchUser } from "~/lib/auth";

type Props = Readonly<{ children: React.ReactNode }>;

export default async function AppLayout({ children }: Props) {
  const user = await fetchUser();

  return (
    <>
      <SidebarProvider style={{ "--header-height": "calc(var(--spacing) * 14)" } as React.CSSProperties}>
        <Sidebar variant="inset" userName={user.name} userEmail={user.email} userImage={user.image} />
        <SidebarInset className="container">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
