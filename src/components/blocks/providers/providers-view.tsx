"use client";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { useProviders } from "~/hooks/use-provider-queries";

import { ProviderCard } from "./provider-card";

interface Props {
  householdId?: string;
}

export const ProvidersView = ({ householdId }: Props) => {
  const { data, isLoading, error } = useProviders(householdId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message="Failed to load providers" error={error || undefined} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};
