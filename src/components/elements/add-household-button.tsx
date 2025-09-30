"use client";

import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { useHouseholdActions } from "~/hooks/use-household-actions";

export const AddHouseholdButton = () => {
  const t = useTranslations("households");
  const { createHousehold } = useHouseholdActions();

  return (
    <Button size="sm" variant="ghost" onClick={createHousehold}>
      <PlusIcon /> {t("addHousehold")}
    </Button>
  );
};
