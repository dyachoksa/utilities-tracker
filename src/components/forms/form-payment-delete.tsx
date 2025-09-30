"use client";

import type { Payment } from "~/types/payments";

import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useDeletePayment } from "~/hooks/use-payment-queries";

interface Props {
  payment: Payment;
}

export function FormPaymentDelete({ payment }: Props) {
  const t = useTranslations("forms");
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useDeletePayment(payment.id);

  const handleDelete = () => {
    action.mutate(undefined, {
      onSuccess: async () => {
        closeDialog();
        toast.success(t("payment.delete.success"), {
          description: `${payment.paymentPeriod} ${t("payment.delete.successDescription")}`,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-800">{t("payment.delete.confirm")} &apos;{payment.paymentPeriod}&apos;?</p>
      <p className="text-sm text-gray-700">{t("payment.delete.warning")}</p>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
        <Button disabled={action.isPending} onClick={handleDelete}>
          {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("payment.delete.submit")}
        </Button>
        <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
          {t("common.buttons.cancel")}
        </Button>
      </div>
    </div>
  );
}
