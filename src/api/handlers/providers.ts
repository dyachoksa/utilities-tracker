import type {
  CreateRoute,
  GetActiveTariffRoute,
  GetRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "~/api/routes/providers";
import type { AppRouteHandler } from "~/types/api";

import * as HttpStatusCodes from "stoker/http-status-codes";

import { toResponse } from "~/api/mappers/providers";
import { toResponse as toTariffResponse } from "~/api/mappers/tariffs";
import { createProvider, deleteProvider, getProvider, getProviders, updateProvider } from "~/services/providers";
import { getActiveTariff as doGetActiveTariff } from "~/services/tariffs";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { householdId } = c.req.valid("query");

  const providers = await getProviders(userId, householdId);

  return c.json(providers.map(toResponse));
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const data = c.req.valid("json");

  const provider = await createProvider({ ...data, userId });

  return c.json(toResponse(provider), HttpStatusCodes.CREATED);
};

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const provider = await getProvider(userId, id);
  if (!provider) {
    return c.json({ message: "Provider not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(toResponse(provider), HttpStatusCodes.OK);
};

export const getActiveTariff: AppRouteHandler<GetActiveTariffRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const provider = await getProvider(userId, id);
  if (!provider) {
    return c.json({ message: "Provider not found" }, HttpStatusCodes.NOT_FOUND);
  }

  const activeTariff = await doGetActiveTariff(userId, provider.id);
  if (!activeTariff) {
    return c.body(null, HttpStatusCodes.NO_CONTENT);
  }

  return c.json(toTariffResponse(activeTariff), HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const data = c.req.valid("json");

  const provider = await updateProvider(userId, id, data);
  if (!provider) {
    return c.json({ message: "Provider not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(toResponse(provider), HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const provider = await deleteProvider(userId, id);
  if (!provider) {
    return c.json({ message: "Provider not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
