"use client";

import type { Household, HouseholdUpdateData } from "~/types/households";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

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
        toast.success("Household updated", { description: "Changes have been saved" });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message="Failed to update household" error={action.error} />}

        <InputText control={form.control} name="name" label="Name" placeholder="My apartments" required />
        <InputText control={form.control} name="address" label="Address" placeholder="123 Main St" required />
        <InputText
          control={form.control}
          name="area"
          label="Area"
          type="number"
          min={0}
          step={0.01}
          placeholder="85.45"
          hint="Optional"
        />

        <InputCheckbox control={form.control} name="isActive" label="Is active" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Update household
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
