"use client";

import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";

import { PaymentActions } from "~/components/dropdowns/payment-actions";
import { ProviderBadge } from "~/components/elements/provider-badge";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { usePayments } from "~/hooks/use-payment-queries";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
}

export const PendingPayments = ({ className }: Props) => {
  const { data, isLoading } = usePayments({ isPaid: false, page: 1, perPage: 5 });

  return (
    <Card className={cn("gap-1", className)}>
      <CardHeader aria-describedby={undefined}>
        <CardTitle>Pending payments</CardTitle>
        <CardAction>
          <Button variant="link" asChild>
            <Link href="/app/payments">View all</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <Table>
          <TableBody>
            {isLoading && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="text-center">
                  <LoaderCircleIcon className="text-primary inline-block size-8 animate-spin" />
                </TableCell>
              </TableRow>
            )}

            {!isLoading && data?.items.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="text-center">
                  <p className="text-muted-foreground">Things are looking good! No pending payments found.</p>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              data?.items.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.household.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ProviderBadge provider={payment.provider} />
                      <p>{payment.provider.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell className="text-right">
                    <PaymentActions payment={payment} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
