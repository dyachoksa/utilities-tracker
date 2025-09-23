import { HouseholdsView } from "~/components/blocks/households/households-view";
import { AddHouseholdButton } from "~/components/elements/add-household-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Households() {
  await fetchUser();

  return (
    <>
      <Header title="Households">
        <AddHouseholdButton />
      </Header>

      <section className="@container/main p-4 md:p-6">
        <HouseholdsView />
      </section>
    </>
  );
}
