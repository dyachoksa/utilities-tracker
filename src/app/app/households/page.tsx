import { HouseholdsView } from "~/components/blocks/households/households-view";
import { AddHouseholdButton } from "~/components/elements/add-household-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

const breadcrumb = [{ label: "Households", href: "/app/households", isActive: true }];

export default async function Households() {
  await fetchUser();

  return (
    <>
      <Header breadcrumb={breadcrumb}>
        <AddHouseholdButton />
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <HouseholdsView />
      </section>
    </>
  );
}
