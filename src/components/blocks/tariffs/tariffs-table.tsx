"use client";

import type { Tariff } from "~/types/tariffs";

import { isPast } from "date-fns";
import { useTranslations } from "next-intl";

import { AddTariffButton } from "~/components/elements/add-tariff-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

import { TariffRow } from "./tariff-row";

interface Props {
  providerId: string;
  tariffs: Tariff[];
}

export const TariffsTable = ({ providerId, tariffs }: Props) => {
  const t = useTranslations("tariffs.table.headers");
  const activeTariff = tariffs.find((tariff) => tariff.isActive && isPast(tariff.startDate));

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>{t("name")}</TableHead>
          <TableHead>{t("startDate")}</TableHead>
          <TableHead>{t("tariffZones")}</TableHead>
          <TableHead>
            <span className="sr-only">{t("actions")}</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <tbody aria-hidden="true" className="table-row h-2"></tbody>

      <TableBody>
        {tariffs.length === 0 && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={4} className="py-4 text-center">
              <AddTariffButton providerId={providerId} />
            </TableCell>
          </TableRow>
        )}

        {tariffs.map((tariff) => (
          <TariffRow key={tariff.id} tariff={tariff} activeTariffId={activeTariff?.id} />
        ))}
      </TableBody>
    </Table>
  );
};
