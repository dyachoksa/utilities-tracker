import type { Household } from "~/types/households";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

interface Props {
  household: Household;
}

export const HouseholdCard = ({ household }: Props) => {
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>{household.name}</CardTitle>
        <CardDescription>{household.address}</CardDescription>
        <CardAction>
          <Button variant="link" size="sm" asChild>
            <Link href={`/app/households/${household.id}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};
