"use client";

import type { ProviderCreateData } from "~/types/providers";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { ErrorMessage } from "~/components/blocks/error-message";
import { InputSelect } from "~/components/inputs/input-select";
import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { providerTypeOptions } from "~/constants";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useHouseholds } from "~/hooks/use-household-queries";
import { useCreateProvider } from "~/hooks/use-provider-queries";
import { ProviderCreateSchema } from "~/schemas/providers";

interface Props {
  householdId?: string;
}

export function FormProviderCreate({ householdId }: Props) {
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
        toast.success("Provider created", { description: "Now you can add tariffs and start tracking usage" });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message="Failed to create provider" error={action.error} />}

        <div>
          {isLoading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <InputSelect
              control={form.control}
              name="householdId"
              label="Household"
              values={householdOptions}
              disabled={householdId !== undefined}
              required
            />
          )}
        </div>

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

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Create provider
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
