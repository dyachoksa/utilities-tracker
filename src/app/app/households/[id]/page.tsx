import { getTranslations } from "next-intl/server";

import { ChartPaymentsByMonth } from "~/components/blocks/dashboard/chart-payments-by-month";
import { HouseholdOverview } from "~/components/blocks/households/household-overview";
import { PaymentsTable } from "~/components/blocks/payments/payments-table";
import { ProvidersView } from "~/components/blocks/providers/providers-view";
import { SectionHeader } from "~/components/blocks/section-header";
import { HouseholdActions } from "~/components/dropdowns/household-actions";
import { AddPaymentButton } from "~/components/elements/add-payment-button";
import { AddProviderButton } from "~/components/elements/add-provider-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Household({ params }: PageProps<"/app/households/[id]">) {
  const { id } = await params;

  await fetchUser();
  const tHouseholds = await getTranslations("households");
  const tProviders = await getTranslations("providers");
  const tPayments = await getTranslations("payments");

  const breadcrumb = [
    { label: tHouseholds("title"), href: "/app/households" },
    { label: tHouseholds("householdDetails"), href: `/app/households/${id}`, isActive: true },
  ];

  return (
    <>
      <Header breadcrumb={breadcrumb}>
        <div>
          <HouseholdActions householdId={id} />
        </div>
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <HouseholdOverview householdId={id} />

        <ChartPaymentsByMonth householdId={id} />

        <div className="space-y-1">
          <SectionHeader title={tProviders("title")}>
            <AddProviderButton householdId={id} />
          </SectionHeader>

          <ProvidersView householdId={id} />
        </div>

        <div className="space-y-1">
          <SectionHeader title={tPayments("title")}>
            <AddPaymentButton householdId={id} />
          </SectionHeader>

          <PaymentsTable householdId={id} />
        </div>
      </section>
    </>
  );
}
