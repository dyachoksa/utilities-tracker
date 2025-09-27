"use client";

import type { Payment, PaymentMarkAsPaidData } from "~/types/payments";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useMarkPaymentAsPaid } from "~/hooks/use-payment-queries";
import { PaymentMarkAsPaidSchema } from "~/schemas/payments";

interface Props {
  payment: Payment;
}

export function FormPaymentMarkAsPaid({ payment }: Props) {
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useMarkPaymentAsPaid(payment.id);

  const form = useForm<PaymentMarkAsPaidData>({
    resolver: zodResolver(PaymentMarkAsPaidSchema),
    defaultValues: {
      paidAmount: payment.amount,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.mutate(data, {
      onSuccess: () => {
        toast.success("Payment updated", { description: "Payment has been marked as paid" });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <InputText
          control={form.control}
          name="paidAmount"
          label="Paid amount"
          placeholder="100"
          type="number"
          min="0"
          step="0.01"
        />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Mark as paid
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
