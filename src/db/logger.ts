import type { Logger } from "drizzle-orm";

import { logger as log } from "~/lib/logger";

export class AppLogger implements Logger {
  logQuery(query: string, params?: unknown[]): void {
    log.debug({ params }, query);
  }
}

export const logger = new AppLogger();
