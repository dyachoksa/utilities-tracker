"use client";

import type { Provider } from "~/types/providers";

import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useProviderType } from "~/hooks/use-provider-type";

interface Props {
  provider: Provider;
}

export const ProviderCard = ({ provider }: Props) => {
  const t = useTranslations("providers");
  const { getLabel } = useProviderType();

  return (
    <Card className="gap-1 shadow-xs">
      <CardHeader>
        <CardTitle>{provider.name}</CardTitle>
        <CardDescription>
          {getLabel(provider.providerType)}
          {provider.accountNumber && ` • ${provider.accountNumber}`}
        </CardDescription>

        <CardAction>
          <Button variant="link" size="sm" asChild>
            <Link href={`/app/households/${provider.householdId}/providers/${provider.id}`}>{t("view")}</Link>
          </Button>
        </CardAction>
      </CardHeader>

      {provider.websiteUrl && (
        <CardContent>
          <a
            href={provider.websiteUrl}
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
