import type { HouseholdCreateSchema, HouseholdSchema, HouseholdUpdateSchema } from "~/schemas/households";

import { z } from "@hono/zod-openapi";

export type Household = z.infer<typeof HouseholdSchema>;

export type HouseholdCreateData = z.infer<typeof HouseholdCreateSchema>;

export type HouseholdUpdateData = z.infer<typeof HouseholdUpdateSchema>;
