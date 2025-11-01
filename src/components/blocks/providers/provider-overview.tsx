"use client";

import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useProvider } from "~/hooks/use-provider-queries";
import { useProviderType } from "~/hooks/use-provider-type";
import { cn } from "~/lib/utils";

interface Props {
  providerId: string;
  className?: string;
}

export const ProviderOverview = ({ providerId, className }: Props) => {
  const t = useTranslations("providers");
  const { data, isLoading, error } = useProvider(providerId);
  const { getLabel } = useProviderType();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message={t("errors.failedToLoadProvider")} error={error || undefined} />;
  }

  return (
    <Card className={cn("gap-2 shadow-xs", className)}>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {getLabel(data.providerType)}
          {data.accountNumber && ` • ${data.accountNumber}`}
        </CardDescription>
      </CardHeader>
      {data.websiteUrl && (
        <CardContent>
          <a
            href={data.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm underline-offset-2 hover:underline"
          >
            {t("website")}
            <ExternalLinkIcon className="ml-1 inline size-4" />
          </a>
        </CardContent>
      )}
    </Card>
  );
};
