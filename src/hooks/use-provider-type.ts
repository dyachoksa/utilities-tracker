import type { ProviderType } from "~/constants";

import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export const useProviderType = () => {
  const t = useTranslations("common");

  const labels = useMemo<Record<ProviderType, string>>(
    () => ({
      natural_gas: t("labels.natural_gas"),
      electricity: t("labels.electricity"),
      water: t("labels.water"),
      heating: t("labels.heating"),
      maintenance: t("labels.maintenance"),
      other: t("labels.other"),
    }),
    [t]
  );

  const options = useMemo(
    () => Object.entries(labels).map(([key, label]) => ({ value: key as ProviderType, label })),
    [labels]
  );

  const getLabel = useCallback((key: ProviderType) => labels[key], [labels]);

  return { options, getLabel };
};
