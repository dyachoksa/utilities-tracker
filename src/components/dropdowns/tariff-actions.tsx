"use client";

import type { Tariff } from "~/types/tariffs";

import { Edit3Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTariffActions } from "~/hooks/use-tariff-actions";

interface Props {
  tariff: Tariff;
}

export const TariffActions = ({ tariff }: Props) => {
  const { updateTariff, deleteTariff } = useTariffActions({ tariff, providerId: tariff.providerId });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open menu</span>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={updateTariff}>
          <Edit3Icon /> <span className="inline-block pt-0.5">Update</span>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={deleteTariff}>
          <Trash2Icon /> <span className="inline-block pt-0.5">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
