import type { MeterReadingSelectData, MeterReadingSelectWithTariffZoneData } from "~/db/types";
import type { MeterReading, MeterReadingWithTariffZone } from "~/types/meter-readings";

import { formatISO } from "date-fns";

import { toResponse as toTariffZoneResponse } from "./tariff-zones";

export const toResponse = (meterReading: MeterReadingSelectData): MeterReading => ({
  id: meterReading.id,
  providerId: meterReading.providerId,
  tariffZoneId: meterReading.tariffZoneId,
  previousValue: meterReading.previousValue,
  currentValue: meterReading.currentValue,
  description: meterReading.description,
  createdAt: formatISO(meterReading.createdAt),
  updatedAt: formatISO(meterReading.updatedAt),
});

export const toResponseWithTariffZone = (
  meterReading: MeterReadingSelectWithTariffZoneData
): MeterReadingWithTariffZone => ({
  ...toResponse(meterReading),
  tariffZone: toTariffZoneResponse(meterReading.tariffZone),
});
