import { householdsRouter, paymentsRouter, providersRouter, statsRouter, tariffsRouter } from "./routers";

export const routes = [householdsRouter, providersRouter, tariffsRouter, paymentsRouter, statsRouter] as const;
