import type { Control, FieldPath, FieldValues } from "react-hook-form";

import * as React from "react";

import { Checkbox } from "~/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

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
  Omit<React.ComponentPropsWithoutRef<typeof Checkbox>, keyof ComponentProps | "name" | "checked" | "onCheckedChange">;

export default function InputCheckbox<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { label, control, name, className, hint, description, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                name={field.name}
                disabled={field.disabled}
                {...rest}
              />
            </FormControl>
            {label && (
              <div className="flex flex-1 items-center justify-between gap-2">
                <FormLabel className="cursor-pointer text-sm font-normal">{label}</FormLabel>
                {typeof hint === "string" ? <span className="text-muted-foreground text-xs">{hint}</span> : hint}
              </div>
            )}
          </div>

          {description && <FormDescription className="ml-6">{description}</FormDescription>}
          <FormMessage className="ml-6" />
        </FormItem>
      )}
    />
  );
}
