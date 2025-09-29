"use client";

import type { ChartConfig } from "~/components/ui/chart";
import type { ProviderType } from "~/constants";

import { useMemo } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { Skeleton } from "~/components/ui/skeleton";
import { providerTypeLabels } from "~/constants";
import { useDefaultCurrency } from "~/hooks/use-default-currency";
import { usePaymentsByType } from "~/hooks/use-stats-queries";
import { formatCurrency } from "~/lib/formatters";

const defaultData = [
  { providerType: "electricity", amount: 0 },
  { providerType: "natural_gas", amount: 0 },
  { providerType: "water", amount: 0 },
  { providerType: "heating", amount: 0 },
  { providerType: "maintenance", amount: 0 },
  { providerType: "other", amount: 0 },
];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-primary)",
  },
} satisfies ChartConfig;

export const ChartPaymentsByType = () => {
  const currency = useDefaultCurrency();

  const { data, isLoading } = usePaymentsByType();

  const chartData = useMemo(
    () =>
      data?.values
        ? defaultData
            .map((item) => ({
              ...item,
              amount: Number(data.values.find((value) => value.providerType === item.providerType)?.amount ?? "0"),
            }))
            .sort((a, b) => a.amount - b.amount)
        : defaultData,
    [data]
  );

  return (
    <Card className="gap-2 rounded-none border-none py-0 shadow-none">
      <CardHeader className="px-2">
        <CardTitle>Expenses by type</CardTitle>
        <CardDescription>This month expenses by utilities type</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        {isLoading && <Skeleton className="m-6 aspect-square" />}

        {!isLoading && data && (
          <ChartContainer config={chartConfig} className="aspect-square">
            <RadarChart data={chartData} accessibilityLayer>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => providerTypeLabels[value as ProviderType]}
                    valueFormatter={(value) => formatCurrency((value as number).toFixed(4), currency)}
                  />
                }
              />
              <PolarGrid radialLines={true} strokeWidth={1} />
              <PolarAngleAxis
                dataKey="providerType"
                tickFormatter={(value) => providerTypeLabels[value as ProviderType]}
              />
              <Radar dataKey="amount" fill="var(--color-amount)" fillOpacity={0.75} />
            </RadarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
