"use client";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { providerTypeLabels } from "~/constants";
import { useProvider } from "~/hooks/use-provider-queries";
import { cn } from "~/lib/utils";

interface Props {
  providerId: string;
  className?: string;
}

export const ProviderOverview = ({ providerId, className }: Props) => {
  const { data, isLoading, error } = useProvider(providerId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message="Failed to load provider" error={error || undefined} />;
  }

  return (
    <Card className={cn("shadow-xs", className)}>
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
