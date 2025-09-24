import { HouseholdOverview } from "~/components/blocks/households/household-overview";
import { ProvidersView } from "~/components/blocks/providers/providers-view";
import { SectionHeader } from "~/components/blocks/section-header";
import { HouseholdActions } from "~/components/dropdowns/household-actions";
import { AddProviderButton } from "~/components/elements/add-provider-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Household({ params }: PageProps<"/app/households/[id]">) {
  const { id } = await params;

  await fetchUser();

  return (
    <>
      <Header title="Household">
        <div>
          <HouseholdActions householdId={id} />
        </div>
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <HouseholdOverview householdId={id} />

        <div className="space-y-2">
          <SectionHeader title="Providers">
            <AddProviderButton householdId={id} />
          </SectionHeader>

          <ProvidersView householdId={id} />
        </div>
      </section>
    </>
  );
}
