"use client";

import { createContext, useRef } from "react";

import { createDialogStore } from "~/stores/dialogs";

export type DialogStoreApi = ReturnType<typeof createDialogStore>;

export const DialogStoreContext = createContext<DialogStoreApi | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

export const DialogStoreProvider = ({ children }: ProviderProps) => {
  const storeRef = useRef<DialogStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createDialogStore();
  }

  return <DialogStoreContext.Provider value={storeRef.current}>{children}</DialogStoreContext.Provider>;
};
