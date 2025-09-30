import { getTranslations } from "next-intl/server";

import { ChartPaymentsByMonth } from "~/components/blocks/dashboard/chart-payments-by-month";
import { ChartPaymentsByType } from "~/components/blocks/dashboard/chart-payments-by-type";
import { PendingPayments } from "~/components/blocks/dashboard/pending-payments";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Dashboard() {
  await fetchUser();
  const t = await getTranslations("dashboard");

  return (
    <>
      <Header title={t("title")} />

      <section className="@container/main grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6 lg:grid-cols-3">
        <ChartPaymentsByType />
        <PendingPayments className="lg:col-span-2" />

        <div className="md:col-span-2 lg:col-span-3">
          <ChartPaymentsByMonth />
        </div>
      </section>
    </>
  );
}
