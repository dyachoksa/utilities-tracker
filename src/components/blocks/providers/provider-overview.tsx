"use client";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { providerTypeLabels } from "~/constants";
import { useProvider } from "~/hooks/use-provider-queries";

interface Props {
  providerId: string;
}

export const ProviderOverview = ({ providerId }: Props) => {
  const { data, isLoading, error } = useProvider(providerId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message="Failed to load provider" error={error || undefined} />;
  }

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {providerTypeLabels[data.providerType]}
          {data.accountNumber && ` • ${data.accountNumber}`}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
