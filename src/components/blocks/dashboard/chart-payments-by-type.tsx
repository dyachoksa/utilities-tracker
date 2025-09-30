"use client";

import type { ChartConfig } from "~/components/ui/chart";
import type { ProviderType } from "~/constants";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { Skeleton } from "~/components/ui/skeleton";
import { useDefaultCurrency } from "~/hooks/use-default-currency";
import { useProviderType } from "~/hooks/use-provider-type";
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

export const ChartPaymentsByType = () => {
  const t = useTranslations("dashboard.charts.paymentsByType");
  const currency = useDefaultCurrency();

  const chartConfig = {
    amount: {
      label: t("legend.amount"),
      color: "var(--chart-primary)",
    },
  } satisfies ChartConfig;

  const { getLabel } = useProviderType();
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
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        {isLoading && <Skeleton className="m-6 aspect-square" />}

        {!isLoading && data && (
          <ChartContainer config={chartConfig} className="aspect-square">
            <RadarChart data={chartData} accessibilityLayer>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => getLabel(value as ProviderType)}
                    valueFormatter={(value) => formatCurrency((value as number).toFixed(4), currency)}
                  />
                }
              />
              <PolarGrid radialLines={true} strokeWidth={1} />
              <PolarAngleAxis dataKey="providerType" tickFormatter={(value) => getLabel(value as ProviderType)} />
              <Radar dataKey="amount" fill="var(--color-amount)" fillOpacity={0.75} />
            </RadarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
