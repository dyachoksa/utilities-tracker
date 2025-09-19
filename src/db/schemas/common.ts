import { timestamp, uuid } from "drizzle-orm/pg-core";
import { v7 as uuidV7 } from "uuid";

export const id = () =>
  uuid()
    .primaryKey()
    .$default(() => uuidV7());

export const timestamps = () => ({
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
});
