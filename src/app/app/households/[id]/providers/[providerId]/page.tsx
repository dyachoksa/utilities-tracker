import { ProviderOverview } from "~/components/blocks/providers/provider-overview";
import { ProviderActions } from "~/components/dropdowns/provider-actions";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Provider({ params }: PageProps<"/app/households/[id]/providers/[providerId]">) {
  const { providerId } = await params;

  await fetchUser();

  return (
    <>
      <Header title="Provider">
        <div>
          <ProviderActions providerId={providerId} />
        </div>
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <ProviderOverview providerId={providerId} />
      </section>
    </>
  );
}
