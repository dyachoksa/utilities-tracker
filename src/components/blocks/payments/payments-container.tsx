"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { ChartPaymentsByMonth } from "~/components/blocks/dashboard/chart-payments-by-month";
import { SectionHeader } from "~/components/blocks/section-header";

import { PaymentsFilters } from "./payments-filters";
import { PaymentsTable } from "./payments-table";

export const PaymentsContainer = () => {
  const t = useTranslations("payments");
  const [householdId, setHouseholdId] = useState<string | undefined>(undefined);
  const [isPaid, setPaid] = useState<boolean | undefined>(undefined);

  return (
    <>
      <PaymentsFilters onHouseholdChange={setHouseholdId} onIsPaidChange={setPaid} />

      <ChartPaymentsByMonth householdId={householdId} />

      <div className="space-y-1">
        <SectionHeader title={t("title")} />
        <PaymentsTable householdId={householdId} isPaid={isPaid} />
      </div>
    </>
  );
};
