import { createRouter } from "~/lib/create-router";

import * as householdHandlers from "./handlers/households";
import * as providerHandlers from "./handlers/providers";
import * as householdRoutes from "./routes/households";
import * as providerRoutes from "./routes/providers";

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
  .openapi(providerRoutes.update, providerHandlers.update)
  .openapi(providerRoutes.remove, providerHandlers.remove);
