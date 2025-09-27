import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { households, meterReadings, payments, providers, tariffs, tariffZones } from "./schemas";

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

export const TariffZoneSelectSchema = createSelectSchema(tariffZones);
export type TariffZoneSelectData = z.infer<typeof TariffZoneSelectSchema>;

export const TariffZoneInsertSchema = createInsertSchema(tariffZones);
export type TariffZoneInsertData = z.infer<typeof TariffZoneInsertSchema>;

export const TariffZoneUpdateSchema = createUpdateSchema(tariffZones);
export type TariffZoneUpdateData = z.infer<typeof TariffZoneUpdateSchema>;

export const TariffSelectSchema = createSelectSchema(tariffs);
export type TariffSelectData = z.infer<typeof TariffSelectSchema>;

export const TariffSelectWithZonesSchema = TariffSelectSchema.extend({
  tariffZones: TariffZoneSelectSchema.array(),
});
export type TariffSelectWithZonesData = z.infer<typeof TariffSelectWithZonesSchema>;

export const TariffInsertSchema = createInsertSchema(tariffs);
export type TariffInsertData = z.infer<typeof TariffInsertSchema>;

export const TariffUpdateSchema = createUpdateSchema(tariffs);
export type TariffUpdateData = z.infer<typeof TariffUpdateSchema>;

export const PaymentSelectSchema = createSelectSchema(payments);
export type PaymentSelectData = z.infer<typeof PaymentSelectSchema>;

export const PaymentInsertSchema = createInsertSchema(payments);
export type PaymentInsertData = z.infer<typeof PaymentInsertSchema>;

export const PaymentUpdateSchema = createUpdateSchema(payments);
export type PaymentUpdateData = z.infer<typeof PaymentUpdateSchema>;

export const MeterReadingSelectSchema = createSelectSchema(meterReadings);
export type MeterReadingSelectData = z.infer<typeof MeterReadingSelectSchema>;

export const MeterReadingSelectWithTariffZoneSchema = MeterReadingSelectSchema.extend({
  tariffZone: TariffZoneSelectSchema,
});
export type MeterReadingSelectWithTariffZoneData = z.infer<typeof MeterReadingSelectWithTariffZoneSchema>;

export const MeterReadingInsertSchema = createInsertSchema(meterReadings);
export type MeterReadingInsertData = z.infer<typeof MeterReadingInsertSchema>;

export const MeterReadingUpdateSchema = createUpdateSchema(meterReadings);
export type MeterReadingUpdateData = z.infer<typeof MeterReadingUpdateSchema>;

export const PaymentSelectWithRelationsSchema = PaymentSelectSchema.extend({
  household: HouseholdSelectSchema,
  provider: ProviderSelectSchema,
  meterReadings: MeterReadingSelectWithTariffZoneSchema.array(),
});
export type PaymentSelectWithRelationsData = z.infer<typeof PaymentSelectWithRelationsSchema>;
