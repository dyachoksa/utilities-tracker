import { getTranslations } from "next-intl/server";

import { PaymentsContainer } from "~/components/blocks/payments/payments-container";
import { AddPaymentButton } from "~/components/elements/add-payment-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Payments() {
  await fetchUser();
  const t = await getTranslations("payments");

  return (
    <>
      <Header title={t("title")}>
        <AddPaymentButton variant="ghost" />
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <PaymentsContainer />
      </section>
    </>
  );
}
