import { createRouter } from "~/lib/create-router";

import * as householdHandlers from "./handlers/households";
import * as householdRoutes from "./routes/households";

export const householdsRouter = createRouter()
  .openapi(householdRoutes.list, householdHandlers.list)
  .openapi(householdRoutes.create, householdHandlers.create)
  .openapi(householdRoutes.get, householdHandlers.get)
  .openapi(householdRoutes.update, householdHandlers.update)
  .openapi(householdRoutes.remove, householdHandlers.remove);
