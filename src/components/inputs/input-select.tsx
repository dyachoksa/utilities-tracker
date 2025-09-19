import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "~/components/ui/select";

type ControlProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

type Value = { value: string; label?: string };

type ComponentProps = {
  values: Value[] | readonly Value[];
  label: string;
  clearable?: boolean;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  placeholder?: string;
  className?: string;
};

type Props<TFieldValues extends FieldValues> = ControlProps<TFieldValues> &
  ComponentProps &
  Omit<React.ComponentPropsWithoutRef<typeof Select>, keyof ComponentProps | "name">;

export default function InputSelect<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { values, label, control, name, className, hint, description, placeholder, clearable, ...rest } = props;

  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center justify-between gap-2">
            <FormLabel>{label}</FormLabel>
            {typeof hint === "string" ? <span className="text-muted-foreground text-xs">{hint}</span> : hint}
          </div>

          <Select
            onValueChange={field.onChange}
            value={field.value ?? undefined}
            name={field.name}
            disabled={field.disabled}
            onOpenChange={setOpen}
            open={open}
            {...rest}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {values.map((opt) => (
                <SelectItem value={opt.value} key={opt.value}>
                  {opt.label ?? opt.value}
                </SelectItem>
              ))}
              {clearable && field.value && (
                <>
                  <SelectSeparator />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => {
                      field.onChange(undefined);
                      setOpen(false);
                    }}
                  >
                    Clear
                    <XIcon className="size-4" />
                  </Button>
                </>
              )}
            </SelectContent>
          </Select>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
