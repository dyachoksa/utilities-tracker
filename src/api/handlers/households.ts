import type { CreateRoute, GetRoute, ListRoute, RemoveRoute, UpdateRoute } from "~/api/routes/households";
import type { AppRouteHandler } from "~/types/api";

import * as HttpStatusCodes from "stoker/http-status-codes";

import { toResponse } from "~/api/mappers/households";
import { createHousehold, deleteHousehold, getHousehold, getHouseholds, updateHousehold } from "~/services/households";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const households = await getHouseholds(userId, { requestId: c.get("requestId") });

  return c.json(households.map(toResponse));
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const data = c.req.valid("json");

  const household = await createHousehold({ ...data, userId }, { requestId: c.get("requestId") });

  return c.json(toResponse(household), HttpStatusCodes.CREATED);
};

export const get: AppRouteHandler<GetRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const household = await getHousehold(userId, id, { requestId: c.get("requestId") });
  if (!household) {
    return c.json({ message: "Household not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(toResponse(household), HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const data = c.req.valid("json");

  const household = await updateHousehold(userId, id, data, { requestId: c.get("requestId") });
  if (!household) {
    return c.json({ message: "Household not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(toResponse(household), HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const user = c.get("user");
  const userId = user!.id;

  const { id } = c.req.valid("param");

  const household = await deleteHousehold(userId, id, { requestId: c.get("requestId") });
  if (!household) {
    return c.json({ message: "Household not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
