"use client";

import type { MeterReadingCreateData } from "~/types/meter-readings";
import type { PaymentCreateData } from "~/types/payments";

import { zodResolver } from "@hookform/resolvers/zod";
import { endOfMonth, formatISO, isToday, subMonths } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("forms");

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
        toast.success(t("payment.create.success"), { description: t("payment.create.successDescription") });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message={t("payment.create.error")} error={action.error} />}

        {householdId === undefined && (
          <InputSelectHousehold
            control={form.control}
            name="householdId"
            label={t("common.labels.household")}
            placeholder={t("common.placeholders.selectHousehold")}
          />
        )}

        {formHouseholdId && (
          <InputSelectProvider
            control={form.control}
            name="providerId"
            label={t("common.labels.provider")}
            householdId={formHouseholdId}
            placeholder={t("common.placeholders.selectProvider")}
            required
          />
        )}

        <InputDate control={form.control} name="paymentPeriod" label={t("common.labels.paymentPeriod")} required />

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
          label={t("common.labels.isPaid")}
          description={t("common.hints.isPaidDescription")}
        />

        <InputTextarea
          control={form.control}
          name="description"
          label={t("common.labels.description")}
          hint={t("common.hints.optional")}
        />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("payment.create.submit")}
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            {t("common.buttons.cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
