import type { TariffSelectWithZonesData } from "~/db/types";
import type { Tariff } from "~/types/tariffs";

import { formatISO } from "date-fns";

import { toResponse as toTariffZoneResponse } from "./tariff-zones";

export const toResponse = (tariff: TariffSelectWithZonesData): Tariff => {
  return {
    id: tariff.id,
    name: tariff.name,
    providerId: tariff.providerId,
    tariffType: tariff.tariffType,
    startDate: tariff.startDate,
    description: tariff.description,
    isActive: tariff.isActive,
    tariffZones: tariff.tariffZones.map(toTariffZoneResponse),
    createdAt: formatISO(tariff.createdAt, { representation: "complete" }),
    updatedAt: formatISO(tariff.updatedAt, { representation: "complete" }),
  };
};
