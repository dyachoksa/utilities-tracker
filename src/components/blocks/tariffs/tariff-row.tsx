"use client";

import type { Tariff } from "~/types/tariffs";

import { isFuture } from "date-fns";

import { TariffActions } from "~/components/dropdowns/tariff-actions";
import { Badge } from "~/components/ui/badge";
import { TableCell, TableRow } from "~/components/ui/table";
import { useDefaultCurrency } from "~/hooks/use-default-currency";
import { formatCurrency, formatDate } from "~/lib/formatters";

interface Props {
  tariff: Tariff;
  activeTariffId?: string;
}

export const TariffRow = ({ tariff, activeTariffId }: Props) => {
  const currency = useDefaultCurrency();

  const isUpcoming = isFuture(tariff.startDate);
  const isActive = tariff.id === activeTariffId;

  return (
    <TableRow key={tariff.id} className="border-none">
      <TableCell>
        <div className="flex items-center gap-2">
          <p className="font-medium">{tariff.name}</p>
          {isUpcoming && <Badge variant="outline">Upcoming</Badge>}
          {isActive && <Badge variant="default">Active</Badge>}
        </div>
      </TableCell>
      <TableCell>{formatDate(tariff.startDate)}</TableCell>
      <TableCell>
        <ul className="list-inside list-disc text-gray-700">
          {tariff.tariffZones.map((zone) => (
            <li key={zone.id}>
              {zone.name} - {formatCurrency(zone.price, currency)}
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell className="text-right">
        <span className="sr-only">Actions</span>
        <TariffActions tariff={tariff} />
      </TableCell>
    </TableRow>
  );
};
