import { headers } from "next/headers";

import { Footer } from "~/components/layouts/public/footer";
import { Header } from "~/components/layouts/public/header";
import { auth } from "~/lib/auth";

type Props = Readonly<{ children: React.ReactNode }>;

export default async function PublicLayout({ children }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  const isAuthenticated = !!session;

  return (
    <div className="flex min-h-svh flex-col">
      <Header isAuthenticated={isAuthenticated} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
