"use client";

import { useTranslations } from "next-intl";

import { Card, CardContent } from "~/components/ui/card";
import { useDefaultCurrency } from "~/hooks/use-default-currency";
import { usePaymentTotals } from "~/hooks/use-stats-queries";
import { formatCurrency } from "~/lib/formatters";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

export const PaymentOverview = ({ className }: Props) => {
  const currency = useDefaultCurrency();
  const t = useTranslations("dashboard.charts.paymentOverview");

  const { data } = usePaymentTotals();

  if (!data) {
    return null;
  }

  const plannedAmount = Number(data.amount);
  const paidAmount = Number(data.paidAmount);
  const remainingAmount = plannedAmount - paidAmount;
  const percentagePaid = (paidAmount / plannedAmount) * 100;

  return (
    <Card className={cn("gap-2 rounded-none border-none py-0 shadow-none", className)}>
      <CardContent className="space-y-6 px-2">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mb-1 text-sm text-gray-600">{t("planned")}</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(plannedAmount, currency)}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-600">{t("paid")}</p>
            <p className="text-primary text-xl font-bold">{formatCurrency(paidAmount, currency)}</p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{t("progress")}</span>
            <span className="text-sm font-bold text-gray-900">{percentagePaid.toFixed(1)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className="to-primary flex h-3 items-center justify-end rounded-full bg-gradient-to-r from-blue-400 pr-1 transition-all duration-500"
              style={{ width: `${percentagePaid}%` }}
            >
              {percentagePaid > 10 && (
                <span className="text-[10px] font-bold text-white">{percentagePaid.toFixed(0)}%</span>
              )}
            </div>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-xs text-gray-500">
              {t("remaining")}: {formatCurrency(remainingAmount, currency)}
            </span>
            <span className="text-xs text-gray-500">
              {t("target")}: {formatCurrency(plannedAmount, currency)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
