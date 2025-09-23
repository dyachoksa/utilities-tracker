"use client";

import { Edit3Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useHouseholdActions } from "~/hooks/use-household-actions";
import { useHousehold } from "~/hooks/use-household-queries";

interface Props {
  householdId: string;
}

export const HouseholdActions = ({ householdId }: Props) => {
  const { data } = useHousehold(householdId);
  const { updateHousehold, deleteHousehold } = useHouseholdActions(data);

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
        <DropdownMenuItem onClick={updateHousehold}>
          <Edit3Icon /> <span className="inline-block pt-0.5">Update household</span>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={deleteHousehold}>
          <Trash2Icon /> <span className="inline-block pt-0.5">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
