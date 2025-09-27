import { PaymentsTable } from "~/components/blocks/payments/payments-table";
import { ProviderOverview } from "~/components/blocks/providers/provider-overview";
import { SectionHeader } from "~/components/blocks/section-header";
import { TariffsView } from "~/components/blocks/tariffs/tariffs-view";
import { ProviderActions } from "~/components/dropdowns/provider-actions";
import { AddPaymentButton } from "~/components/elements/add-payment-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Provider({ params }: PageProps<"/app/households/[id]/providers/[providerId]">) {
  const { id, providerId } = await params;

  await fetchUser();

  return (
    <>
      <Header title="Provider">
        <div>
          <ProviderActions providerId={providerId} />
        </div>
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <ProviderOverview providerId={providerId} />
          <TariffsView providerId={providerId} className="md:col-span-2" />
        </div>

        <div className="space-y-1">
          <SectionHeader title="Payments">
            <AddPaymentButton householdId={id} providerId={providerId} />
          </SectionHeader>

          <PaymentsTable householdId={id} providerId={providerId} />
        </div>
      </section>
    </>
  );
}
