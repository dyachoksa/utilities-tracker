"use client";

import type { ButtonProps } from "~/components/ui/button";

import { PlusIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { usePaymentActions } from "~/hooks/use-payment-actions";

interface Props {
  householdId?: string;
  providerId?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}

export const AddPaymentButton = ({ householdId, providerId, variant = "link", size = "sm" }: Props) => {
  const { createPayment } = usePaymentActions({ householdId, providerId });

  return (
    <Button variant={variant} size={size} type="button" onClick={createPayment}>
      <PlusIcon /> Add payment
    </Button>
  );
};
