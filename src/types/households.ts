import z from "zod";

import { HouseholdCreateSchema, HouseholdSchema, HouseholdUpdateSchema } from "~/schemas/households";

export type Household = z.infer<typeof HouseholdSchema>;

export type HouseholdCreateData = z.infer<typeof HouseholdCreateSchema>;

export type HouseholdUpdateData = z.infer<typeof HouseholdUpdateSchema>;
