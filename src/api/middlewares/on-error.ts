import type { AppBindings } from "~/types/api";

import { ErrorHandler } from "hono";
import { onError as defaultOnError } from "stoker/middlewares";

export const onError: ErrorHandler<AppBindings> = (err, c) => {
  // todo: add app specific errors
  return defaultOnError(err, c);
};
