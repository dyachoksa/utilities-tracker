"use client";

import { useTranslations } from "next-intl";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useProvider } from "~/hooks/use-provider-queries";
import { useProviderType } from "~/hooks/use-provider-type";
import { cn } from "~/lib/utils";

interface Props {
  providerId: string;
  className?: string;
}

export const ProviderOverview = ({ providerId, className }: Props) => {
  const t = useTranslations("providers.errors");
  const { data, isLoading, error } = useProvider(providerId);
  const { getLabel } = useProviderType();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message={t("failedToLoadProvider")} error={error || undefined} />;
  }

  return (
    <Card className={cn("shadow-xs", className)}>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {getLabel(data.providerType)}
          {data.accountNumber && ` • ${data.accountNumber}`}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
