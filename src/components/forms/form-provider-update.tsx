"use client";

import type { Provider, ProviderUpdateData } from "~/types/providers";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { ErrorMessage } from "~/components/blocks/error-message";
import { InputCheckbox } from "~/components/inputs/input-checkbox";
import { InputSelect } from "~/components/inputs/input-select";
import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useUpdateProvider } from "~/hooks/use-provider-queries";
import { useProviderType } from "~/hooks/use-provider-type";
import { ProviderUpdateSchema } from "~/schemas/providers";

interface Props {
  provider: Provider;
}

export function FormProviderUpdate({ provider }: Props) {
  const t = useTranslations("forms");
  const { options: providerTypeOptions } = useProviderType();

  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useUpdateProvider(provider.id);

  const defaultValues = useMemo<ProviderUpdateData>(
    () => ({
      name: provider.name,
      providerType: provider.providerType,
      accountNumber: provider.accountNumber,
      websiteUrl: provider.websiteUrl,
      isActive: provider.isActive,
    }),
    [provider]
  );

  const form = useForm<ProviderUpdateData>({
    resolver: zodResolver(ProviderUpdateSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    action.mutate(data, {
      onSuccess: () => {
        toast.success(t("provider.update.success"), { description: t("provider.update.successDescription") });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message={t("provider.update.error")} error={action.error} />}

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
          placeholder="123456789"
          hint={t("common.hints.optional")}
        />
        <InputText
          control={form.control}
          name="websiteUrl"
          label={t("common.labels.websiteUrl")}
          placeholder="https://electro.com"
          type="url"
          hint={t("common.hints.optional")}
        />
        <InputCheckbox control={form.control} name="isActive" label={t("common.labels.isActive")} />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("provider.update.submit")}
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            {t("common.buttons.cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
