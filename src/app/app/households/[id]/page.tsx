import { HouseholdOverview } from "~/components/blocks/households/household-overview";
import { HouseholdActions } from "~/components/dropdowns/household-actions";
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

      <section className="@container/main p-4 md:p-6">
        <HouseholdOverview householdId={id} />
      </section>
    </>
  );
}
