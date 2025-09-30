import type { TariffType } from "~/constants";

import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export const useTariffType = () => {
  const t = useTranslations("common");

  const labels = useMemo<Record<TariffType, string>>(
    () => ({
      "counter-based": t("labels.counter-based"),
      "fixed-rate": t("labels.fixed-rate"),
      "area-based": t("labels.area-based"),
    }),
    [t]
  );

  const options = useMemo(
    () => Object.entries(labels).map(([key, label]) => ({ value: key as TariffType, label })),
    [labels]
  );

  const getLabel = useCallback((key: TariffType) => labels[key], [labels]);

  return { options, getLabel };
};
