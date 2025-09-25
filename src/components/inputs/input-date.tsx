import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type ControlProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

type ComponentProps = {
  label?: string;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  placeholder?: string;
  className?: string;
};

type Props<TFieldValues extends FieldValues> = ControlProps<TFieldValues> &
  ComponentProps &
  Omit<React.ComponentPropsWithoutRef<typeof Calendar>, keyof ComponentProps | "name"> & {
    disabled?: boolean;
  };

export function InputDate<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { label, control, name, className, hint, description, placeholder = "Pick a date", disabled, ...rest } = props;

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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "border-input w-full justify-start bg-white text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={disabled}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {field.value ? format(new Date(field.value), "PPP") : <span>{placeholder}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {/* @ts-expect-error bad types */}
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      // Format as ISO date string (YYYY-MM-DD) to match the expected format
                      field.onChange(format(date, "yyyy-MM-dd"));
                    } else {
                      field.onChange("");
                    }
                  }}
                  disabled={disabled}
                  {...rest}
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
