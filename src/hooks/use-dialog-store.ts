import type { DialogStore } from "~/stores/dialogs";

import { useContext } from "react";
import { useStore } from "zustand";

import { DialogStoreContext } from "~/components/providers/dialog-store-provider";

export const useDialogStore = <T>(selector: (state: DialogStore) => T): T => {
  const context = useContext(DialogStoreContext);

  if (!context) {
    throw new Error("useDialogStore must be used within a DialogStoreProvider");
  }

  return useStore(context, selector);
};
