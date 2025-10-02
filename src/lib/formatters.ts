import type { DateArg } from "date-fns";

import { formatDate as formatDateFn } from "date-fns";

export const formatDate = (date: DateArg<Date>) => formatDateFn(date, "PP");

export const formatMonth = (date: DateArg<Date>) => formatDateFn(date, "MMMM, yyyy");

export const formatCurrency = (amount: string, currency: string) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
  });

  return formatter.format(Number(amount));
};
