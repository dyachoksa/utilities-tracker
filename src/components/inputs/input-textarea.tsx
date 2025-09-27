import type { Control, FieldPath, FieldValues } from "react-hook-form";

import * as React from "react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

type ControlProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

type ComponentProps = {
  label?: string;
  description?: React.ReactNode;
  hint?: React.ReactNode;
};

type Props<TFieldValues extends FieldValues> = ControlProps<TFieldValues> &
  ComponentProps &
  Omit<React.ComponentPropsWithoutRef<"textarea">, keyof ComponentProps | "name">;

export function InputTextarea<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { label, control, name, className, hint, description, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <div className="flex items-center justify-between gap-2">
              <FormLabel>{label}</FormLabel>
              {typeof hint === "string" ? <span className="text-muted-foreground text-xs">{hint}</span> : hint}
            </div>
          )}

          <FormControl>
            <Textarea {...field} value={field.value || ""} {...rest} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
