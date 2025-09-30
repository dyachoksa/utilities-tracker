"use client";

import type { Payment } from "~/types/payments";

import { HandCoinsIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usePaymentActions } from "~/hooks/use-payment-actions";

interface Props {
  payment: Payment;
}

export const PaymentActions = ({ payment }: Props) => {
  const t = useTranslations("dashboard.pendingPayments.actions");
  const { markAsPaid, deletePayment } = usePaymentActions({ payment });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">{t("openMenu")}</span>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!payment.isPaid && (
          <DropdownMenuItem onClick={markAsPaid}>
            <HandCoinsIcon /> <span className="inline-block pt-0.5">{t("markAsPaid")}</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem variant="destructive" onClick={deletePayment}>
          <Trash2Icon /> <span className="inline-block pt-0.5">{t("delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
