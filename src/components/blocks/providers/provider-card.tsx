import type { Provider } from "~/types/providers";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { providerTypeLabels } from "~/constants";

interface Props {
  provider: Provider;
}

export const ProviderCard = ({ provider }: Props) => {
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>{provider.name}</CardTitle>
        <CardDescription>
          {providerTypeLabels[provider.providerType]}
          {provider.accountNumber && ` • ${provider.accountNumber}`}
        </CardDescription>

        <CardAction>
          <Button variant="link" size="sm" asChild>
            <Link href={`/app/households/${provider.householdId}/providers/${provider.id}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};
