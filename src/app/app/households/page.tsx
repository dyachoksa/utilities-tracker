import { getTranslations } from "next-intl/server";

import { HouseholdsView } from "~/components/blocks/households/households-view";
import { AddHouseholdButton } from "~/components/elements/add-household-button";
import { Header } from "~/components/layouts/app/header";
import { fetchUser } from "~/lib/auth";

export default async function Households() {
  await fetchUser();
  const t = await getTranslations("households");

  const breadcrumb = [{ label: t("title"), href: "/app/households", isActive: true }];

  return (
    <>
      <Header breadcrumb={breadcrumb}>
        <AddHouseholdButton />
      </Header>

      <section className="@container/main space-y-4 p-4 md:space-y-6 md:p-6">
        <HouseholdsView />
      </section>
    </>
  );
}
