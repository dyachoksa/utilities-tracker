import type { CreateRoute, ListRoute, MarkAsPaidRoute, RemoveRoute } from "~/api/routes/payments";
import type { AppRouteHandler } from "~/types/api";

import * as HttpStatusCodes from "stoker/http-status-codes";

import { toResponse, toResponseWithMeterReadings } from "~/api/mappers/payments";
import { getHousehold } from "~/services/households";
import { createMeterReadings } from "~/services/meter-readings";
import { createPayment, deletePayment, getPayments, markPaymentAsPaid } from "~/services/payments";
import { getProvider } from "~/services/providers";
import { getActiveTariff } from "~/services/tariffs";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { providerId, tariffId, householdId, page, perPage } = c.req.valid("query");

  const { items, total } = await getPayments(
    { userId, providerId, tariffId, householdId, page, perPage },
    { requestId: c.get("requestId") }
  );

  return c.json(
    {
      items: items.map(toResponseWithMeterReadings),
      meta: { page, perPage, total, count: items.length },
    },
    HttpStatusCodes.OK
  );
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const requestId = c.get("requestId");

  const user = c.get("user");
  const userId = user!.id;

  const { meterReadings, ...data } = c.req.valid("json");

  const provider = await getProvider(userId, data.providerId, { requestId });
  if (!provider) {
    return c.json({ message: "Provider not found" }, HttpStatusCodes.BAD_REQUEST);
  }

  const tariff = await getActiveTariff(userId, data.providerId, { requestId });
  if (!tariff) {
    return c.json({ message: "No active tariffs found for provider" }, HttpStatusCodes.BAD_REQUEST);
  }

  // todo: calculate amount based on tariff and its zones
  let amount = data.amount;
  if (!amount) {
    if (tariff.tariffType === "fixed-rate") {
      amount = tariff.tariffZones.reduce((acc, zone) => acc + Number(zone.price), 0).toFixed(2);
    } else if (tariff.tariffType === "counter-based") {
      amount = tariff.tariffZones
        .reduce((acc, zone) => {
          const reading = meterReadings?.find((reading) => reading.tariffZoneId === zone.id);
          return !reading
            ? acc
            : acc + (Number(reading.currentValue) - Number(reading.previousValue)) * Number(zone.price);
        }, 0)
        .toFixed(2);
    } else if (tariff.tariffType === "area-based") {
      // Household at this point should always be defined
      // if not - database does not work correctly or has broken relations
      const household = (await getHousehold(userId, provider.householdId, { requestId }))!;
      amount = (
        Number(household.area || "0") * tariff.tariffZones.reduce((acc, zone) => acc + Number(zone.price), 0)
      ).toFixed(2);
    } else {
      amount = "0.00";
    }
  }

  let paidAmount = data.paidAmount;
  if (!paidAmount) {
    paidAmount = "0.00";
  }

  const payment = await createPayment(
    {
      ...data,
      amount,
      paidAmount,
      userId,
      householdId: provider.householdId,
      tariffId: tariff.id,
    },
    { requestId }
  );

  if (meterReadings && meterReadings.length > 0) {
    await createMeterReadings(
      meterReadings.map((reading) => ({ ...reading, paymentId: payment.id, providerId: provider.id })),
      { requestId }
    );
  }

  return c.json(toResponse(payment), HttpStatusCodes.CREATED);
};

export const markAsPaid: AppRouteHandler<MarkAsPaidRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  const payment = await markPaymentAsPaid(userId, id, data, { requestId: c.get("requestId") });
  if (!payment) {
    return c.json({ message: "Payment not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(toResponse(payment), HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const payment = await deletePayment(userId, id, { requestId: c.get("requestId") });
  if (!payment) {
    return c.json({ message: "Payment not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
