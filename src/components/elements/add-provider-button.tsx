"use client";

import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { useProviderActions } from "~/hooks/use-provider-actions";

interface Props {
  householdId?: string;
}

export const AddProviderButton = ({ householdId }: Props) => {
  const t = useTranslations("providers");
  const { createProvider } = useProviderActions({ householdId });

  return (
    <Button variant="link" size="sm" onClick={createProvider}>
      <PlusIcon /> {t("addProvider")}
    </Button>
  );
};
