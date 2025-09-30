"use client";

import type { Provider } from "~/types/providers";

import { Badge } from "~/components/ui/badge";
import { useProviderType } from "~/hooks/use-provider-type";

export const ProviderBadge = ({ provider }: { provider: Provider }) => {
  const { getLabel } = useProviderType();
  return (
    <Badge variant="outline" className="border-blue-400 text-blue-400">
      {getLabel(provider.providerType)}
    </Badge>
  );
};
