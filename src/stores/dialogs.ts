import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export type State = {
  dialogOpen: boolean;
  dialogTitle: string;
  dialogDescription: React.ReactNode;
  dialogContent: React.ReactNode;
  dialogFooter?: React.ReactNode;
};

export type DialogOptions = Pick<State, "dialogTitle" | "dialogDescription" | "dialogContent" | "dialogFooter">;

export type Actions = {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
};

export type DialogStore = State & Actions;

export const defaultInitState: State = {
  dialogOpen: false,
  dialogTitle: "",
  dialogDescription: "",
  dialogContent: null,
  dialogFooter: null,
};

export const createDialogStore = (initState: State = defaultInitState) =>
  createStore<DialogStore>()(
    immer((set) => ({
      ...initState,

      openDialog: (options: DialogOptions) => set({ dialogOpen: true, ...options }),
      closeDialog: () =>
        set({ dialogOpen: false, dialogTitle: "", dialogDescription: "", dialogContent: null, dialogFooter: null }),
    }))
  );
