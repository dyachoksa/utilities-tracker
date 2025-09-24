import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { households, providers } from "./schemas";

export const HouseholdSelectSchema = createSelectSchema(households);

export type HouseholdSelectData = z.infer<typeof HouseholdSelectSchema>;

export const HouseholdInsertSchema = createInsertSchema(households);

export type HouseholdInsertData = z.infer<typeof HouseholdInsertSchema>;

export const HouseholdUpdateSchema = createUpdateSchema(households);

export type HouseholdUpdateData = z.infer<typeof HouseholdUpdateSchema>;

export const ProviderSelectSchema = createSelectSchema(providers);

export type ProviderSelectData = z.infer<typeof ProviderSelectSchema>;

export const ProviderInsertSchema = createInsertSchema(providers);

export type ProviderInsertData = z.infer<typeof ProviderInsertSchema>;

export const ProviderUpdateSchema = createUpdateSchema(providers);

export type ProviderUpdateData = z.infer<typeof ProviderUpdateSchema>;
