"use client";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { useHouseholds } from "~/hooks/use-household-queries";

import { HouseholdCard } from "./household-card";

export const HouseholdsView = () => {
  const { data, isLoading, error } = useHouseholds();

  if (isLoading) {
    return <LoadingIndicator className="h-[70vh]" />;
  }

  if (error || !data) {
    return <ErrorMessage message="Failed to load households" error={error || undefined} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((household) => (
        <HouseholdCard key={household.id} household={household} />
      ))}
    </div>
  );
};
