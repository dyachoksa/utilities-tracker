import { pinoLogger } from "hono-pino";

import { logger as log } from "~/lib/logger";

export const logger = () => pinoLogger({ pino: log });
