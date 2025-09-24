"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useProviderActions } from "~/hooks/use-provider-actions";

interface Props {
  householdId?: string;
}

export const AddProviderButton = ({ householdId }: Props) => {
  const { createProvider } = useProviderActions({ householdId });

  return (
    <Button variant="link" size="sm" onClick={createProvider}>
      <PlusIcon /> Add provider
    </Button>
  );
};
