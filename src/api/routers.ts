import { createRouter } from "~/lib/create-router";

import * as householdHandlers from "./handlers/households";
import * as paymentHandlers from "./handlers/payments";
import * as providerHandlers from "./handlers/providers";
import * as statsHandlers from "./handlers/stats";
import * as tariffHandlers from "./handlers/tariffs";
import * as householdRoutes from "./routes/households";
import * as paymentRoutes from "./routes/payments";
import * as providerRoutes from "./routes/providers";
import * as statsRoutes from "./routes/stats";
import * as tariffRoutes from "./routes/tariffs";

export const householdsRouter = createRouter()
  .openapi(householdRoutes.list, householdHandlers.list)
  .openapi(householdRoutes.create, householdHandlers.create)
  .openapi(householdRoutes.get, householdHandlers.get)
  .openapi(householdRoutes.update, householdHandlers.update)
  .openapi(householdRoutes.remove, householdHandlers.remove);

export const providersRouter = createRouter()
  .openapi(providerRoutes.list, providerHandlers.list)
  .openapi(providerRoutes.create, providerHandlers.create)
  .openapi(providerRoutes.get, providerHandlers.get)
  .openapi(providerRoutes.getActiveTariff, providerHandlers.getActiveTariff)
  .openapi(providerRoutes.update, providerHandlers.update)
  .openapi(providerRoutes.remove, providerHandlers.remove);

export const tariffsRouter = createRouter()
  .openapi(tariffRoutes.list, tariffHandlers.list)
  .openapi(tariffRoutes.create, tariffHandlers.create)
  .openapi(tariffRoutes.get, tariffHandlers.get)
  .openapi(tariffRoutes.latestReadings, tariffHandlers.latestReadings)
  .openapi(tariffRoutes.update, tariffHandlers.update)
  .openapi(tariffRoutes.remove, tariffHandlers.remove);

export const paymentsRouter = createRouter()
  .openapi(paymentRoutes.list, paymentHandlers.list)
  .openapi(paymentRoutes.create, paymentHandlers.create)
  .openapi(paymentRoutes.markAsPaid, paymentHandlers.markAsPaid)
  .openapi(paymentRoutes.remove, paymentHandlers.remove);

export const statsRouter = createRouter()
  .openapi(statsRoutes.paymentTotals, statsHandlers.paymentTotals)
  .openapi(statsRoutes.paymentsByType, statsHandlers.paymentsByType)
  .openapi(statsRoutes.paymentsByMonths, statsHandlers.paymentsByMonths);
