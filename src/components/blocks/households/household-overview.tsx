"use client";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { useHousehold } from "~/hooks/use-household-queries";

interface Props {
  householdId: string;
}

export const HouseholdOverview = ({ householdId }: Props) => {
  const { data, isLoading, error } = useHousehold(householdId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message="Failed to load household" error={error || undefined} />;
  }

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
      <div className="flex items-baseline gap-2">
        <p className="text-lg font-semibold text-gray-700">{data.address}</p>
        {data.area && (
          <p className="text-base text-gray-600">
            ({data.area} m<sup>2</sup>)
          </p>
        )}
      </div>
    </>
  );
};
