"use client";

import type { TariffCreateData } from "~/types/tariffs";

import { zodResolver } from "@hookform/resolvers/zod";
import { formatISO } from "date-fns";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { ErrorMessage } from "~/components/blocks/error-message";
import { InputDate } from "~/components/inputs/input-date";
import { InputSelect } from "~/components/inputs/input-select";
import { InputText } from "~/components/inputs/input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { tariffTypeOptions } from "~/constants";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useCreateTariff } from "~/hooks/use-tariff-queries";
import { TariffCreateSchema } from "~/schemas/tariffs";

interface Props {
  providerId: string;
}

export function FormTariffCreate({ providerId }: Props) {
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useCreateTariff();

  const defaultValues = useMemo<TariffCreateData>(
    () => ({
      providerId,
      name: "",
      description: "",
      tariffType: "counter-based",
      startDate: formatISO(new Date(), { representation: "date" }),
      isActive: true,
      tariffZones: [],
    }),
    [providerId]
  );

  const form = useForm<TariffCreateData>({
    resolver: zodResolver(TariffCreateSchema),
    defaultValues,
  });
  const tariffZones = useFieldArray({ control: form.control, name: "tariffZones" });

  const addTariffZone = () => {
    tariffZones.append({ description: null, name: "", price: "" });
  };

  const onSubmit = form.handleSubmit((data) => {
    action.mutate(data, {
      onSuccess: () => {
        toast.success("Tariff created", { description: "Tariff has been created successfully" });
        closeDialog();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {action.error && <ErrorMessage message="Failed to create tariff" error={action.error} />}

        <InputText control={form.control} name="name" label="Name" placeholder="Default monthly" required />
        <InputSelect control={form.control} name="tariffType" label="Tariff type" values={tariffTypeOptions} required />
        <InputDate control={form.control} name="startDate" label="Start date" required />
        <InputText control={form.control} name="description" label="Description" placeholder="Optional" />

        <div>
          <div className="flex items-center justify-between gap-2">
            <Label>Tariff zones</Label>
            <Button type="button" variant="link" size="sm" onClick={addTariffZone}>
              <PlusIcon /> Add zone
            </Button>
          </div>
          <div className="space-y-3 pt-2">
            {tariffZones.fields.map((field, index) => (
              <div key={field.id} className="flex flex-row gap-2">
                <InputText
                  control={form.control}
                  name={`tariffZones.${index}.name`}
                  label="Name"
                  placeholder="Default"
                  required
                />
                <InputText
                  control={form.control}
                  name={`tariffZones.${index}.price`}
                  label="Price"
                  placeholder="4.50"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                />
                <div className="flex flex-col justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => tariffZones.remove(index)}
                    title="Remove tariff zone"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            ))}
            {form.formState.errors.tariffZones?.root && (
              <p className="text-sm text-red-500">{form.formState.errors.tariffZones.root?.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" disabled={action.isPending}>
            {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Create tariff
          </Button>
          <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
