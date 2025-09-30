"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { ErrorMessage } from "~/components/blocks/error-message";
import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useTranslations } from "next-intl";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useCreateHousehold } from "~/hooks/use-household-queries";
import { HouseholdCreateSchema } from "~/schemas/households";

export function FormHouseholdCreate() {
  const t = useTranslations("forms");
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useCreateHousehold();
  const form = useForm({
    resolver: zodResolver(HouseholdCreateSchema),
    defaultValues: {
      name: "",
      address: "",
      area: "",
      isActive: true,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.mutate(data, {
      onSuccess: () => {
        toast.success(t("household.create.success"), { description: t("household.create.successDescription") });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message={t("household.create.error")} error={action.error} />}

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

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("household.create.submit")}
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            {t("common.buttons.cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
