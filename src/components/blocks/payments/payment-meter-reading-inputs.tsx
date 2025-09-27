import type { Control, FieldValues } from "react-hook-form";
import type { PaymentCreateData } from "~/types/payments";
import type { Tariff } from "~/types/tariffs";

import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

import { InputText } from "~/components/inputs/input-text";
import { Label } from "~/components/ui/label";
import { useLatestMeterReadings } from "~/hooks/use-meter-reading-queries";

type ControlProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
};

type Props<TFieldValues extends FieldValues> = ControlProps<TFieldValues> & {
  tariff: Tariff;
};

const getZoneName = (tariff: Tariff, zoneId: string) =>
  tariff.tariffZones.find((zone) => zone.id === zoneId)?.name || "Default";

export const PaymentMeterReadingInputs = ({ tariff, control }: Props<PaymentCreateData>) => {
  const { data: latestMeterReadings, isLoading } = useLatestMeterReadings(tariff.id);

  const meterReadingsArray = useFieldArray({ control, name: "meterReadings" });

  const { fields, replace } = meterReadingsArray;

  useEffect(() => {
    replace(
      tariff.tariffZones.map((zone) => {
        const latestReadings = latestMeterReadings?.find((reading) => reading.tariffZoneId === zone.id);

        return {
          previousValue: latestReadings?.currentValue || 0,
          currentValue: latestReadings?.currentValue || 0,
          tariffZoneId: zone.id,
          description: null,
        };
      })
    );
  }, [tariff, latestMeterReadings, replace]);

  if (tariff.tariffType !== "counter-based") return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-1">
        <Loader2Icon className="text-primary/75 size-7 animate-spin" />
      </div>
    );
  }

  return (
    <div className="border-border border-y py-4">
      <div className="space-y-2">
        <Label>Meter Readings</Label>
        <div className="space-y-2">
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-4">
              <InputText
                control={control}
                name={`meterReadings.${i}.previousValue`}
                label={getZoneName(tariff, field.tariffZoneId)}
                hint="Previous value"
              />
              <InputText
                control={control}
                name={`meterReadings.${i}.currentValue`}
                label={getZoneName(tariff, field.tariffZoneId)}
                hint="Current value"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
