"use client";

import type { FieldValues } from "react-hook-form";

import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";

import { Label } from "~/components/ui/label";
import { useHouseholds } from "~/hooks/use-household-queries";

import { InputSelect } from "./input-select";

type Props<TFieldValues extends FieldValues> = Omit<React.ComponentProps<typeof InputSelect<TFieldValues>>, "values">;

export function InputSelectHousehold<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { data, isLoading } = useHouseholds();

  const options = useMemo(
    () => data?.map((household) => ({ value: household.id, label: household.name })) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <div>
        <Label>{props.label}</Label>
        <div className="flex items-center justify-center py-1">
          <Loader2Icon className="text-primary/75 size-7 animate-spin" />
        </div>
      </div>
    );
  }

  return <InputSelect<TFieldValues> values={options} {...props} />;
}
