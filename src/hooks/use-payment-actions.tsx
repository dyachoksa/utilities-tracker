import type { Payment } from "~/types/payments";

import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { FormPaymentCreate } from "~/components/forms/form-payment-create";
import { FormPaymentDelete } from "~/components/forms/form-payment-delete";
import { FormPaymentMarkAsPaid } from "~/components/forms/form-payment-mark-as-paid";

import { useDialogStore } from "./use-dialog-store";

interface Params {
  providerId?: string;
  householdId?: string;
  payment?: Payment;
}

export const usePaymentActions = ({ providerId, householdId, payment }: Params) => {
  const openDialog = useDialogStore(useShallow((state) => state.openDialog));

  const createPayment = useCallback(() => {
    openDialog({
      dialogTitle: "Create payment",
      dialogDescription: "Create/plan a new payment",
      dialogContent: <FormPaymentCreate providerId={providerId} householdId={householdId} />,
    });
  }, [openDialog, providerId, householdId]);

  /*
  const updatePayment = useCallback(() => {
    if (!payment) return;

    openDialog({
      dialogTitle: "Update payment",
      dialogDescription: "Update payment",
      dialogContent: <FormPaymentUpdate payment={payment} />,
    });
  }, [openDialog, payment]);
  */

  const markAsPaid = useCallback(() => {
    if (!payment) return;

    openDialog({
      dialogTitle: "Mark as paid",
      dialogDescription: "Mark payment as paid",
      dialogContent: <FormPaymentMarkAsPaid payment={payment} />,
    });
  }, [openDialog, payment]);

  const deletePayment = useCallback(() => {
    if (!payment) return;

    openDialog({
      dialogTitle: "Delete payment",
      dialogDescription: "Delete payment",
      dialogContent: <FormPaymentDelete payment={payment} />,
    });
  }, [openDialog, payment]);

  return { createPayment, markAsPaid, deletePayment };
};
