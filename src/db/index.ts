import { DefaultLogger } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schemas";

const logger = new DefaultLogger();

export const client = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle({ casing: "snake_case", client, logger, schema });
