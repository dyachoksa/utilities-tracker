import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { FormHouseholdCreate } from "~/components/forms/form-household-create";
import { FormHouseholdDelete } from "~/components/forms/form-household-delete";
import { FormHouseholdUpdate } from "~/components/forms/form-household-update";
import { Household } from "~/types/households";

import { useDialogStore } from "./use-dialog-store";

export const useHouseholdActions = (household?: Household) => {
  const openDialog = useDialogStore(useShallow((state) => state.openDialog));

  const createHousehold = useCallback(() => {
    openDialog({
      dialogTitle: "Create household",
      dialogDescription: "Create a new household to track utilities",
      dialogContent: <FormHouseholdCreate />,
    });
  }, [openDialog]);

  const updateHousehold = useCallback(() => {
    if (!household) return;

    openDialog({
      dialogTitle: "Update household",
      dialogDescription: "Update household details",
      dialogContent: <FormHouseholdUpdate household={household} />,
    });
  }, [openDialog, household]);

  const deleteHousehold = useCallback(() => {
    if (!household) return;

    openDialog({
      dialogTitle: "Delete household",
      dialogDescription: "Delete household and stop tracking its utilities",
      dialogContent: <FormHouseholdDelete household={household} />,
    });
  }, [openDialog, household]);

  return { createHousehold, updateHousehold, deleteHousehold };
};
