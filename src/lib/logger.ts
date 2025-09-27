import pino from "pino";
import pinoPretty from "pino-pretty";

export const logger = pino(
  { level: process.env.LOG_LEVEL || "info" },
  process.env.NODE_ENV === "development" ? pinoPretty() : undefined
);
