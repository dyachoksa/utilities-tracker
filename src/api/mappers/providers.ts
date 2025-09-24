import type { ProviderSelectData } from "~/db/types";
import type { Provider } from "~/types/providers";

import { formatISO } from "date-fns";

export const toResponse = (data: ProviderSelectData): Provider => {
  return {
    id: data.id,
    householdId: data.householdId,
    name: data.name,
    providerType: data.providerType,
    accountNumber: data.accountNumber,
    websiteUrl: data.websiteUrl,
    isActive: data.isActive,
    createdAt: formatISO(data.createdAt, { representation: "complete" }),
    updatedAt: formatISO(data.updatedAt, { representation: "complete" }),
  };
};
