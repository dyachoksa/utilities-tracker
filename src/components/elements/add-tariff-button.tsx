"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useTariffActions } from "~/hooks/use-tariff-actions";

interface Props {
  providerId: string;
}

export const AddTariffButton = ({ providerId }: Props) => {
  const { createTariff } = useTariffActions({ providerId });

  return (
    <Button variant="link" size="sm" onClick={createTariff}>
      <PlusIcon /> Add tariff
    </Button>
  );
};
