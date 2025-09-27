import type { PaymentSelectData, PaymentSelectWithRelationsData } from "~/db/types";
import type { Payment, PaymentWithRelations } from "~/types/payments";

import { formatISO } from "date-fns";

import { toResponse as toHouseholdResponse } from "./households";
import { toResponseWithTariffZone as toMeterReadingResponse } from "./meter-readings";
import { toResponse as toProviderResponse } from "./providers";

export const toResponse = (data: PaymentSelectData): Payment => ({
  id: data.id,
  householdId: data.householdId,
  providerId: data.providerId,
  tariffId: data.tariffId,
  amount: data.amount,
  paidAmount: data.paidAmount,
  paymentPeriod: data.paymentPeriod,
  description: data.description,
  isPaid: data.isPaid,
  createdAt: formatISO(data.createdAt),
  updatedAt: formatISO(data.updatedAt),
});

export const toResponseWithMeterReadings = (data: PaymentSelectWithRelationsData): PaymentWithRelations => ({
  ...toResponse(data),
  household: toHouseholdResponse(data.household),
  provider: toProviderResponse(data.provider),
  meterReadings: data.meterReadings.map(toMeterReadingResponse),
});
