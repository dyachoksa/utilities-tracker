import type {
  PaymentCreateSchema,
  PaymentMarkAsPaidSchema,
  PaymentSchema,
  PaymentsListSchema,
  PaymentWithRelationsSchema,
} from "~/schemas/payments";

import { z } from "@hono/zod-openapi";

export type Payment = z.infer<typeof PaymentSchema>;

export type PaymentWithRelations = z.infer<typeof PaymentWithRelationsSchema>;

export type PaymentsList = z.infer<typeof PaymentsListSchema>;

export type PaymentCreateData = z.infer<typeof PaymentCreateSchema>;

export type PaymentMarkAsPaidData = z.infer<typeof PaymentMarkAsPaidSchema>;
