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
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useCreateHousehold } from "~/hooks/use-household-queries";
import { HouseholdCreateSchema } from "~/schemas/households";

export function FormHouseholdCreate() {
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
        toast.success("Household created", { description: "Now you can add providers and start tracking utilities" });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message="Failed to create household" error={action.error} />}

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

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null}Create household
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
