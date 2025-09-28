import type { Provider } from "~/types/providers";

import { Badge } from "~/components/ui/badge";
import { providerTypeLabels } from "~/constants";

export const ProviderBadge = ({ provider }: { provider: Provider }) => {
  return (
    <Badge variant="outline" className="border-blue-400 text-blue-400">
      {providerTypeLabels[provider.providerType]}
    </Badge>
  );
};
