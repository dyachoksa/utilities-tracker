import { householdsRouter, paymentsRouter, providersRouter, tariffsRouter } from "./routers";

export const routes = [householdsRouter, providersRouter, tariffsRouter, paymentsRouter] as const;
