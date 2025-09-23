"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useHouseholdActions } from "~/hooks/use-household-actions";

export const AddHouseholdButton = () => {
  const { createHousehold } = useHouseholdActions();

  return (
    <Button size="sm" variant="ghost" onClick={createHousehold}>
      <PlusIcon /> Add household
    </Button>
  );
};
