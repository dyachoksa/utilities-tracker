"use client";

import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { useTariffActions } from "~/hooks/use-tariff-actions";

interface Props {
  providerId: string;
}

export const AddTariffButton = ({ providerId }: Props) => {
  const t = useTranslations("tariffs");
  const { createTariff } = useTariffActions({ providerId });

  return (
    <Button variant="link" size="sm" onClick={createTariff}>
      <PlusIcon /> {t("addTariff")}
    </Button>
  );
};
