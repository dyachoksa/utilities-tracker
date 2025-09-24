import type { Provider } from "~/types/providers";

import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { FormProviderCreate } from "~/components/forms/form-provider-create";
import { FormProviderDelete } from "~/components/forms/form-provider-delete";
import { FormProviderUpdate } from "~/components/forms/form-provider-update";

import { useDialogStore } from "./use-dialog-store";

interface Params {
  householdId?: string;
  provider?: Provider;
}

export const useProviderActions = ({ householdId, provider }: Params) => {
  const openDialog = useDialogStore(useShallow((state) => state.openDialog));

  const createProvider = useCallback(() => {
    openDialog({
      dialogTitle: "Create provider",
      dialogDescription: "Create a new utility service provider",
      dialogContent: <FormProviderCreate householdId={householdId} />,
    });
  }, [openDialog, householdId]);

  const updateProvider = useCallback(() => {
    if (!provider) return;

    openDialog({
      dialogTitle: "Update provider",
      dialogDescription: "Update provider details",
      dialogContent: <FormProviderUpdate provider={provider} />,
    });
  }, [openDialog, provider]);

  const deleteProvider = useCallback(() => {
    if (!provider) return;

    openDialog({
      dialogTitle: "Delete provider",
      dialogDescription: "Delete provider and stop tracking its usage",
      dialogContent: <FormProviderDelete provider={provider} />,
    });
  }, [openDialog, provider]);

  return { createProvider, updateProvider, deleteProvider };
};
