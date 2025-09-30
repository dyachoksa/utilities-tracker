"use client";

import type { Provider } from "~/types/providers";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useProviderType } from "~/hooks/use-provider-type";

interface Props {
  provider: Provider;
}

export const ProviderCard = ({ provider }: Props) => {
  const t = useTranslations("providers");
  const { getLabel } = useProviderType();

  return (
    <Card className="shadow-xs">
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
    </Card>
  );
};
