import type { Tariff } from "~/types/tariffs";

import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { FormTariffCreate } from "~/components/forms/form-tariff-create";
import { FormTariffDelete } from "~/components/forms/form-tariff-delete";
import { FormTariffUpdate } from "~/components/forms/form-tariff-update";

import { useDialogStore } from "./use-dialog-store";

interface Params {
  providerId: string;
  tariff?: Tariff;
}

export const useTariffActions = ({ providerId, tariff }: Params) => {
  const openDialog = useDialogStore(useShallow((state) => state.openDialog));

  const createTariff = useCallback(() => {
    openDialog({
      dialogTitle: "Create tariff",
      dialogDescription: "Create a new tariff",
      dialogContent: <FormTariffCreate providerId={providerId} />,
    });
  }, [openDialog, providerId]);

  const updateTariff = useCallback(() => {
    if (!tariff) return;

    openDialog({
      dialogTitle: "Update tariff",
      dialogDescription: "Update tariff",
      dialogContent: <FormTariffUpdate tariff={tariff} />,
    });
  }, [openDialog, tariff]);

  const deleteTariff = useCallback(() => {
    if (!tariff) return;

    openDialog({
      dialogTitle: "Delete tariff",
      dialogDescription: "Delete tariff",
      dialogContent: <FormTariffDelete tariff={tariff} />,
    });
  }, [openDialog, tariff]);

  return { createTariff, updateTariff, deleteTariff };
};
