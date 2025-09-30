"use client";

import { useTranslations } from "next-intl";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { useTariffs } from "~/hooks/use-tariff-queries";

import { TariffsTable } from "./tariffs-table";

interface Props {
  providerId: string;
  className?: string;
}

export const TariffsView = ({ providerId, className }: Props) => {
  const t = useTranslations("tariffs.errors");
  const { data, isLoading, error } = useTariffs(providerId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !data) {
    return <ErrorMessage message={t("failedToLoad")} error={error || undefined} />;
  }

  return (
    <div className={className}>
      <TariffsTable tariffs={data} providerId={providerId} />
    </div>
  );
};
