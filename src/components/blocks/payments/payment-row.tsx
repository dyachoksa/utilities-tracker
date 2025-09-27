"use client";

import type { PaymentWithRelations } from "~/types/payments";

import { CheckIcon, HandCoinsIcon } from "lucide-react";

import { PaymentActions } from "~/components/dropdowns/payment-actions";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { TableCell, TableRow } from "~/components/ui/table";
import { providerTypeLabels } from "~/constants";
import { useDefaultCurrency } from "~/hooks/use-default-currency";
import { usePaymentActions } from "~/hooks/use-payment-actions";
import { formatCurrency } from "~/lib/formatters";

export const PaymentRow = ({ payment }: { payment: PaymentWithRelations }) => {
  const currency = useDefaultCurrency();

  const { markAsPaid } = usePaymentActions({ payment });

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell>{payment.paymentPeriod}</TableCell>
      <TableCell>{payment.household.name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-blue-400 text-blue-400">
            {providerTypeLabels[payment.provider.providerType]}
          </Badge>
          <p>{payment.provider.name}</p>
        </div>
      </TableCell>
      <TableCell>
        {payment.meterReadings.length > 0 ? (
          <ul className="list-inside list-disc text-gray-600">
            {payment.meterReadings.map((reading) => (
              <li key={reading.id}>
                {reading.tariffZone.name}: {reading.previousValue} - {reading.currentValue}
              </li>
            ))}
          </ul>
        ) : (
          <p>&nbsp;</p>
        )}
      </TableCell>
      <TableCell>{formatCurrency(payment.amount, currency)}</TableCell>
      <TableCell>{formatCurrency(payment.paidAmount, currency)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-1">
          {payment.isPaid ? (
            <CheckIcon className="me-2 inline-flex size-5 text-green-600" />
          ) : (
            <Button variant="ghost" size="icon" title="Mark as paid" onClick={markAsPaid}>
              <HandCoinsIcon />
            </Button>
          )}
          <PaymentActions payment={payment} />
        </div>
      </TableCell>
    </TableRow>
  );
};
