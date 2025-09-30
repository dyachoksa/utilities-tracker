"use client";

import type { ChartConfig } from "~/components/ui/chart";

import { format, subMonths } from "date-fns";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Bar, CartesianGrid, ComposedChart, Line, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Skeleton } from "~/components/ui/skeleton";
import { useDefaultCurrency } from "~/hooks/use-default-currency";
import { usePaymentsByMonths } from "~/hooks/use-stats-queries";
import { formatCurrency, formatMonth } from "~/lib/formatters";

interface Props {
  householdId?: string;
  providerId?: string;
}

export const ChartPaymentsByMonth = ({ householdId, providerId }: Props) => {
  const t = useTranslations("dashboard.charts.paymentsByMonth");
  const currency = useDefaultCurrency();

  const chartConfig = {
    amount: {
      label: t("legend.amount"),
      color: "#60a5fa",
    },
    paidAmount: {
      label: t("legend.paid"),
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const { data, isLoading } = usePaymentsByMonths({ householdId, providerId });

  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    // const firstPeriod = new Date(data[0].period); // earliest month in your data
    const lastPeriod = new Date(data[data.length - 1].period); // latest month
    const totalMonths = 12;

    // Build the last 12 months ending with lastPeriod
    const months = Array.from({ length: totalMonths }).map((_, i) => subMonths(lastPeriod, totalMonths - 1 - i));

    // Quick lookup for existing data
    const dataMap = new Map(data.map((item) => [format(new Date(item.period), "yyyy-MM"), item]));

    // Fill with data or zeros
    return months.map((date) => {
      const key = format(date, "yyyy-MM");
      const item = dataMap.get(key);
      return {
        period: formatMonth(date),
        amount: item ? Number(item.amount) : 0,
        paidAmount: item ? Number(item.paidAmount) : 0,
      };
    });
  }, [data]);

  return (
    <Card className="gap-2 rounded-none border-none py-0 shadow-none">
      <CardHeader className="px-2">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        {isLoading && <Skeleton className="m-6 aspect-[32/9]" />}

        {!isLoading && data && (
          <ChartContainer config={chartConfig} className="aspect-[32/9] w-full">
            <ComposedChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    valueFormatter={(value) => formatCurrency((value as number).toFixed(4), currency)}
                  />
                }
              />
              <XAxis dataKey="period" tickLine={false} tickMargin={10} axisLine={false} />
              <Bar dataKey="amount" fill="var(--color-amount)" fillOpacity={0.95} radius={4} />
              <Bar dataKey="paidAmount" fill="var(--color-paidAmount)" fillOpacity={0.95} radius={4} />
              <Line
                dataKey="paidAmount"
                stroke="var(--color-chart-primary)"
                type="monotone"
                strokeWidth={2}
                dot={false}
                legendType="none"
                tooltipType="none"
                connectNulls
              />
            </ComposedChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
