import { PaymentsTable } from "~/components/blocks/payments/payments-table";
import { AddPaymentButton } from "~/components/elements/add-payment-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Payments() {
  await fetchUser();

  return (
    <>
      <Header title="Payments">
        <AddPaymentButton variant="ghost" />
      </Header>

      <section className="@container/main p-4 md:p-6">
        <PaymentsTable />
      </section>
    </>
  );
}
