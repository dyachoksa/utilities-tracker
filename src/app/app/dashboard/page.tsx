import { PendingPayments } from "~/components/blocks/dashboard/pending-payments";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Dashboard() {
  await fetchUser();

  return (
    <>
      <Header title="Dashboard" />

      <section className="@container/main grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
        <div>Chart</div>
        <PendingPayments className="lg:col-span-2" />

        <div className="md:col-span-2 lg:col-span-3">Usage chart</div>
      </section>
    </>
  );
}
