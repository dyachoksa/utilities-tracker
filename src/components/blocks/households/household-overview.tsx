"use client";

import { useTranslations } from "next-intl";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useHousehold } from "~/hooks/use-household-queries";

interface Props {
  householdId: string;
}

export const HouseholdOverview = ({ householdId }: Props) => {
  const t = useTranslations("households.errors");
  const { data, isLoading, error } = useHousehold(householdId);

  if (isLoading) {
    return <LoadingIndicator className="h-32" />;
  }

  if (error || !data) {
    return <ErrorMessage message={t("failedToLoadHousehold")} error={error || undefined} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {data.address}
          {data.area && (
            <span className="text-gray-600">
              ({data.area} m<sup>2</sup>)
            </span>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
