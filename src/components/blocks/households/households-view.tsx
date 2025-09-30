"use client";

import { useTranslations } from "next-intl";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { useHouseholds } from "~/hooks/use-household-queries";

import { HouseholdCard } from "./household-card";

export const HouseholdsView = () => {
  const t = useTranslations("households.errors");
  const { data, isLoading, error } = useHouseholds();

  if (isLoading) {
    return <LoadingIndicator className="h-[70vh]" />;
  }

  if (error || !data) {
    return <ErrorMessage message={t("failedToLoad")} error={error || undefined} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((household) => (
        <HouseholdCard key={household.id} household={household} />
      ))}
    </div>
  );
};
