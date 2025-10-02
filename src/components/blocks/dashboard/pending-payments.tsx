"use client";

import { LoaderCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("dashboard.pendingPayments");
  const { data, isLoading } = usePayments({ isPaid: false, page: 1, perPage: 10 });

  return (
    <Card className={cn("gap-1", className)}>
      <CardHeader aria-describedby={undefined}>
        <CardTitle>{t("title")}</CardTitle>
        <CardAction>
          <Button variant="link" asChild>
            <Link href="/app/payments">{t("viewAll")}</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-grow">
        {isLoading && (
          <div className="flex h-full items-center justify-center text-center">
            <LoaderCircleIcon className="text-primary inline-block size-8 animate-spin" />
          </div>
        )}
        {!isLoading && (
          <>
            {data?.items.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center">
                <p className="text-muted-foreground">{t("empty")}</p>
              </div>
            ) : (
              <Table>
                <TableBody>
                  {data?.items.map((payment) => (
                    <TableRow key={payment.id} className="border-none">
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
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
