import { ChartPaymentsByMonth } from "~/components/blocks/dashboard/chart-payments-by-month";
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

  const breadcrumb = [
    { label: "Households", href: "/app/households" },
    { label: "Household details", href: `/app/households/${id}` },
    { label: "Provider details", href: `/app/households/${id}/providers/${providerId}`, isActive: true },
  ];

  await fetchUser();

  return (
    <>
      <Header breadcrumb={breadcrumb}>
        <div>
          <ProviderActions providerId={providerId} />
        </div>
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <ProviderOverview providerId={providerId} />
          <TariffsView providerId={providerId} className="md:col-span-2" />
        </div>

        <ChartPaymentsByMonth providerId={providerId} />

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
