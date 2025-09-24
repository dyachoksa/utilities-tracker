"use client";

import type { Provider, ProviderUpdateData } from "~/types/providers";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
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
import { providerTypeOptions } from "~/constants";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useUpdateProvider } from "~/hooks/use-provider-queries";
import { ProviderUpdateSchema } from "~/schemas/providers";

interface Props {
  provider: Provider;
}

export function FormProviderUpdate({ provider }: Props) {
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
        toast.success("Provider updated", { description: "Changes have been saved" });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message="Failed to update provider" error={action.error} />}

        <InputSelect
          control={form.control}
          name="providerType"
          label="Provider type"
          values={providerTypeOptions}
          required
        />
        <InputText control={form.control} name="name" label="Name" placeholder="Electro Inc." required />
        <InputText
          control={form.control}
          name="accountNumber"
          label="Account number"
          placeholder="123456789"
          hint="Optional"
        />
        <InputText
          control={form.control}
          name="websiteUrl"
          label="Website URL"
          placeholder="https://electro.com"
          type="url"
          hint="Optional"
        />
        <InputCheckbox control={form.control} name="isActive" label="Is active" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Save changes
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
