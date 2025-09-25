import type { TariffZoneSelectData } from "~/db/types";
import type { TariffZone } from "~/types/tariffs";

import { formatISO } from "date-fns";

export const toResponse = (tariffZone: TariffZoneSelectData): TariffZone => {
  return {
    id: tariffZone.id,
    name: tariffZone.name,
    tariffId: tariffZone.tariffId,
    price: tariffZone.price,
    description: tariffZone.description,
    createdAt: formatISO(tariffZone.createdAt, { representation: "complete" }),
    updatedAt: formatISO(tariffZone.updatedAt, { representation: "complete" }),
  };
};
