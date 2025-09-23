import type { HouseholdSelectData } from "~/db/types";
import type { Household } from "~/types/households";

import { formatISO } from "date-fns";

export const toResponse = (data: HouseholdSelectData): Household => {
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    area: Number(data.area) ? data.area : null,
    isActive: data.isActive,
    createdAt: formatISO(data.createdAt, { representation: "complete" }),
    updatedAt: formatISO(data.updatedAt, { representation: "complete" }),
  };
};
