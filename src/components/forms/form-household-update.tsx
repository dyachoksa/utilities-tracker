"use client";

import type { Household, HouseholdUpdateData } from "~/types/households";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { useTranslations } from "next-intl";

import { ErrorMessage } from "~/components/blocks/error-message";
import { InputCheckbox } from "~/components/inputs/input-checkbox";
import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useUpdateHousehold } from "~/hooks/use-household-queries";
import { HouseholdUpdateSchema } from "~/schemas/households";

interface Props {
  household: Household;
}

export function FormHouseholdUpdate({ household }: Props) {
  const t = useTranslations("forms");
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useUpdateHousehold(household.id);

  const defaultValues = useMemo<HouseholdUpdateData>(
    () => ({
      name: household.name,
      address: household.address,
      area: household.area,
      isActive: household.isActive,
    }),
    [household]
  );

  const form = useForm<HouseholdUpdateData>({
    resolver: zodResolver(HouseholdUpdateSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    action.mutate(data, {
      onSuccess: () => {
        toast.success(t("household.update.success"), { description: t("household.update.successDescription") });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message={t("household.update.error")} error={action.error} />}

        <InputText control={form.control} name="name" label={t("common.labels.name")} placeholder={t("common.placeholders.name")} required />
        <InputText control={form.control} name="address" label={t("common.labels.address")} placeholder={t("common.placeholders.address")} required />
        <InputText
          control={form.control}
          name="area"
          label={t("common.labels.area")}
          type="number"
          min={0}
          step={0.01}
          placeholder={t("common.placeholders.area")}
          hint={t("common.hints.optional")}
        />

        <InputCheckbox control={form.control} name="isActive" label={t("common.labels.isActive")} />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("household.update.submit")}
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            {t("common.buttons.cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
