"use client";

import { useState } from "react";

import { PaymentsFilters } from "./payments-filters";
import { PaymentsTable } from "./payments-table";

export const PaymentsContainer = () => {
  const [householdId, setHouseholdId] = useState<string | undefined>(undefined);
  const [isPaid, setPaid] = useState<boolean | undefined>(undefined);

  return (
    <>
      <PaymentsFilters onHouseholdChange={setHouseholdId} onIsPaidChange={setPaid} />
      <PaymentsTable householdId={householdId} isPaid={isPaid} />
    </>
  );
};
