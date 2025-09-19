import { PlusIcon } from "lucide-react";

import { Header } from "~/components/layouts/app/header";
import { Button } from "~/components/ui/button";
import { fetchUser } from "~/lib/auth";

export default async function Households() {
  await fetchUser();

  return (
    <>
      <Header title="Households">
        <Button size="sm" variant="ghost">
          <PlusIcon /> Add household
        </Button>
      </Header>

      <section className="@container/main p-4 md:p-6">
        <p>Households</p>
      </section>
    </>
  );
}
