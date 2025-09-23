import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { households } from "./schemas";

export const HouseholdSelectSchema = createSelectSchema(households);

export type HouseholdSelectData = z.infer<typeof HouseholdSelectSchema>;

export const HouseholdInsertSchema = createInsertSchema(households);

export type HouseholdInsertData = z.infer<typeof HouseholdInsertSchema>;

export const HouseholdUpdateSchema = createUpdateSchema(households);

export type HouseholdUpdateData = z.infer<typeof HouseholdUpdateSchema>;
