import { PlusIcon } from "lucide-react";

import { Header } from "~/components/layouts/app/header";
import { Button } from "~/components/ui/button";
import { fetchUser } from "~/lib/auth";

export default async function Payments() {
  await fetchUser();

  return (
    <>
      <Header title="Payments">
        <Button size="sm" variant="ghost">
          <PlusIcon /> Add payment
        </Button>
      </Header>

      <section className="@container/main p-4 md:p-6">
        <p>Payments</p>
      </section>
    </>
  );
}
