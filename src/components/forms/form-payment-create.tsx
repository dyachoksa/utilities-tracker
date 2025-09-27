"use client";

import type { MeterReadingCreateData } from "~/types/meter-readings";
import type { PaymentCreateData } from "~/types/payments";

import { zodResolver } from "@hookform/resolvers/zod";
import { endOfMonth, formatISO, isToday, subMonths } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { ErrorMessage } from "~/components/blocks/error-message";
import { PaymentAmountInputs } from "~/components/blocks/payments/payment-amount-inputs";
import { InputCheckbox } from "~/components/inputs/input-checkbox";
import { InputDate } from "~/components/inputs/input-date";
import { InputSelectHousehold } from "~/components/inputs/input-select-household";
import { InputSelectProvider } from "~/components/inputs/input-select-provider";
import { InputTextarea } from "~/components/inputs/input-textarea";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useCreatePayment } from "~/hooks/use-payment-queries";
import { PaymentCreateSchema } from "~/schemas/payments";

interface Props {
  providerId?: string;
  householdId?: string;
}

const getDefaultPaymentPeriod = () => {
  const now = new Date();
  return isToday(endOfMonth(now))
    ? formatISO(endOfMonth(now), { representation: "date" })
    : formatISO(endOfMonth(subMonths(now, 1)), { representation: "date" });
};

export function FormPaymentCreate({ providerId, householdId }: Props) {
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useCreatePayment();

  const defaultValues = useMemo<PaymentCreateData>(
    () => ({
      householdId: householdId ?? "",
      providerId: providerId ?? "",
      description: "",
      amount: "",
      paidAmount: "",
      paymentPeriod: getDefaultPaymentPeriod(),
      meterReadings: [] as MeterReadingCreateData[],
      isPaid: false,
    }),
    [providerId, householdId]
  );

  const form = useForm({
    resolver: zodResolver(PaymentCreateSchema),
    defaultValues,
  });

  const { watch } = form;

  const formHouseholdId = watch("householdId", defaultValues.householdId);
  const formProviderId = watch("providerId", defaultValues.providerId);

  const onSubmit = form.handleSubmit((data) => {
    action.mutate(data, {
      onSuccess: () => {
        toast.success("Payment created", { description: "Payment has been created successfully" });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message="Failed to create payment" error={action.error} />}

        {householdId === undefined && (
          <InputSelectHousehold
            control={form.control}
            name="householdId"
            label="Household"
            placeholder="Select household"
          />
        )}

        {formHouseholdId && (
          <InputSelectProvider
            control={form.control}
            name="providerId"
            label="Provider"
            householdId={formHouseholdId}
            placeholder="Select provider"
            required
          />
        )}

        <InputDate control={form.control} name="paymentPeriod" label="Payment period" required />

        {formProviderId && (
          <PaymentAmountInputs
            // @ts-expect-error bad typing
            control={form.control}
            providerId={formProviderId}
          />
        )}

        <InputCheckbox
          control={form.control}
          name="isPaid"
          label="Is paid"
          description="Check if it's already been paid"
        />

        <InputTextarea control={form.control} name="description" label="Description" hint="Optional" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Create payment
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
