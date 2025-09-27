"use client";

import type { FieldValues } from "react-hook-form";

import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";

import { Label } from "~/components/ui/label";
import { useProviders } from "~/hooks/use-provider-queries";

import { InputSelect } from "./input-select";

type ComponentProps = { householdId: string };

type Props<TFieldValues extends FieldValues> = Omit<React.ComponentProps<typeof InputSelect<TFieldValues>>, "values"> &
  ComponentProps;

export function InputSelectProvider<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { data, isLoading } = useProviders(props.householdId);

  const options = useMemo(() => data?.map((provider) => ({ value: provider.id, label: provider.name })) ?? [], [data]);

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
