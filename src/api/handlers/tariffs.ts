import type {
  CreateRoute,
  GetRoute,
  LatestReadingsRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "~/api/routes/tariffs";
import type { MeterReadingSelectData } from "~/db/types";
import type { AppRouteHandler } from "~/types/api";

import * as HttpStatusCodes from "stoker/http-status-codes";

import { toResponse as toMeterReadingResponse } from "~/api/mappers/meter-readings";
import { toResponse } from "~/api/mappers/tariffs";
import { getLatestReadings } from "~/services/meter-readings";
import {
  createTariff,
  createTariffZones,
  deleteTariff,
  deleteTariffZones,
  getTariff,
  getTariffs,
  getTariffZones,
  updateTariff,
} from "~/services/tariffs";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { providerId } = c.req.valid("query");

  const tariffs = await getTariffs(userId, providerId);

  return c.json(tariffs.map(toResponse), HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { tariffZones: tariffZonesData, ...data } = c.req.valid("json");

  const tariff = await createTariff({ ...data, userId });
  const tariffZones = await createTariffZones(tariffZonesData.map((zone) => ({ ...zone, tariffId: tariff.id })));

  return c.json(toResponse({ ...tariff, tariffZones }), HttpStatusCodes.CREATED);
};

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const tariff = await getTariff(userId, id);
  if (!tariff) {
    return c.json({ message: "Tariff not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(toResponse(tariff), HttpStatusCodes.OK);
};

export const latestReadings: AppRouteHandler<LatestReadingsRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");
  const tariff = await getTariff(userId, id);
  if (!tariff) {
    return c.json({ message: "Tariff not found" }, HttpStatusCodes.NOT_FOUND);
  }

  const readings: MeterReadingSelectData[] = [];
  for (const tariffZone of tariff.tariffZones) {
    const meterReading = await getLatestReadings(tariffZone.id);
    if (!meterReading) continue;

    readings.push(meterReading);
  }

  return c.json(readings.map(toMeterReadingResponse), HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const { tariffZones: tariffZonesData, ...data } = c.req.valid("json");

  const tariff = await updateTariff(userId, id, data);
  if (!tariff) {
    return c.json({ message: "Tariff not found" }, HttpStatusCodes.NOT_FOUND);
  }

  let tariffZones = await getTariffZones(tariff.id);
  if (tariffZonesData?.length) {
    await deleteTariffZones(tariff.id);
    tariffZones = await createTariffZones(tariffZonesData.map((zone) => ({ ...zone, tariffId: tariff.id })));
  }

  return c.json(toResponse({ ...tariff, tariffZones }), HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const tariff = await deleteTariff(userId, id);
  if (!tariff) {
    return c.json({ message: "Tariff not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
