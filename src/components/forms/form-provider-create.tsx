"use client";

import type { ProviderCreateData } from "~/types/providers";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { ErrorMessage } from "~/components/blocks/error-message";
import { InputSelect } from "~/components/inputs/input-select";
import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useHouseholds } from "~/hooks/use-household-queries";
import { useCreateProvider } from "~/hooks/use-provider-queries";
import { useProviderType } from "~/hooks/use-provider-type";
import { ProviderCreateSchema } from "~/schemas/providers";

interface Props {
  householdId?: string;
}

export function FormProviderCreate({ householdId }: Props) {
  const t = useTranslations("forms");

  const { options: providerTypeOptions } = useProviderType();
  const { data: households, isLoading } = useHouseholds();

  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useCreateProvider();

  const householdOptions = useMemo(() => {
    if (!households) {
      return [];
    }

    return households.map((household) => ({
      value: household.id,
      label: household.name,
    }));
  }, [households]);

  const defaultValues = useMemo<ProviderCreateData>(
    () => ({
      householdId: householdId ?? "",
      providerType: "electricity",
      name: "",
      accountNumber: "",
      websiteUrl: "",
      isActive: true,
    }),
    [householdId]
  );

  const form = useForm<ProviderCreateData>({
    resolver: zodResolver(ProviderCreateSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    action.mutate(data, {
      onSuccess: () => {
        toast.success(t("provider.create.success"), { description: t("provider.create.successDescription") });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message={t("provider.create.error")} error={action.error} />}

        <div>
          {isLoading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <InputSelect
              control={form.control}
              name="householdId"
              label={t("common.labels.household")}
              values={householdOptions}
              disabled={householdId !== undefined}
              required
            />
          )}
        </div>

        <InputSelect
          control={form.control}
          name="providerType"
          label={t("common.labels.provider")}
          values={providerTypeOptions}
          required
        />
        <InputText
          control={form.control}
          name="name"
          label={t("common.labels.name")}
          placeholder={t("common.placeholders.name")}
          required
        />
        <InputText
          control={form.control}
          name="accountNumber"
          label={t("common.labels.accountNumber")}
          placeholder={"123456789"}
          hint={t("common.hints.optional")}
        />
        <InputText
          control={form.control}
          name="websiteUrl"
          label={t("common.labels.websiteUrl")}
          placeholder={"https://electro.com"}
          type="url"
          hint={t("common.hints.optional")}
        />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("provider.create.submit")}
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            {t("common.buttons.cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
