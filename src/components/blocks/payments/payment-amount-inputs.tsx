"use client";

import type { Control, FieldValues } from "react-hook-form";
import type { PaymentCreateData } from "~/types/payments";

import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { InputText } from "~/components/inputs/input-text";
import { useProviderActiveTariff } from "~/hooks/use-provider-queries";

import { PaymentMeterReadingInputs } from "./payment-meter-reading-inputs";

type ControlProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
};

type Props<TFieldValues extends FieldValues> = ControlProps<TFieldValues> & {
  providerId: string;
};

export const PaymentAmountInputs = ({ providerId, control }: Props<PaymentCreateData>) => {
  const { data: activeTariff, isLoading } = useProviderActiveTariff(providerId);

  const form = useFormContext<PaymentCreateData>();
  const { setValue } = form;

  useEffect(() => {
    // skip if it's not loaded yet
    if (activeTariff === undefined) return;

    if (activeTariff === null) {
      setValue("amount", "");
    }
  }, [activeTariff, setValue]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-1">
        <Loader2Icon className="text-primary/75 size-7 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {activeTariff && <PaymentMeterReadingInputs tariff={activeTariff} control={control} />}

      <div className="flex items-start gap-4">
        <InputText
          control={control}
          name="amount"
          label="Amount"
          placeholder="100"
          type="number"
          min="0"
          step="0.01"
          description="Keep empty to auto-calculate"
        />
        <InputText
          control={control}
          name="paidAmount"
          label="Paid amount"
          placeholder="100"
          type="number"
          min="0"
          step="0.01"
          description="Keep empty to auto-calculate"
        />
      </div>
    </>
  );
};
