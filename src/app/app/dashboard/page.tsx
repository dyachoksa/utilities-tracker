import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Dashboard() {
  await fetchUser();

  return (
    <>
      <Header title="Dashboard" />

      <section className="@container/main p-4 md:p-6">
        <p>Dashboard</p>
      </section>
    </>
  );
}
