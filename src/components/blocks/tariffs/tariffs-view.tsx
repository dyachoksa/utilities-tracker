"use client";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { useTariffs } from "~/hooks/use-tariff-queries";

import { TariffsTable } from "./tariffs-table";

interface Props {
  providerId: string;
  className?: string;
}

export const TariffsView = ({ providerId, className }: Props) => {
  const { data, isLoading, error } = useTariffs(providerId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message="Failed to load tariffs" error={error || undefined} />;
  }

  return (
    <div className={className}>
      <TariffsTable tariffs={data} providerId={providerId} />
    </div>
  );
};
