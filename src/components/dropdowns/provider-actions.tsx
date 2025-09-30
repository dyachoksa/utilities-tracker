"use client";

import { Edit3Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useProviderActions } from "~/hooks/use-provider-actions";
import { useProvider } from "~/hooks/use-provider-queries";

interface Props {
  providerId: string;
}

export const ProviderActions = ({ providerId }: Props) => {
  const t = useTranslations("providers.actions");
  const { data } = useProvider(providerId);
  const { updateProvider, deleteProvider } = useProviderActions({ provider: data });

  if (!data) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={updateProvider}>
          <Edit3Icon /> <span className="inline-block pt-0.5">{t("update")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={deleteProvider}>
          <Trash2Icon /> <span className="inline-block pt-0.5">{t("delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
