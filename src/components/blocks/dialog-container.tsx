"use client";

import { useShallow } from "zustand/shallow";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useDialogStore } from "~/hooks/use-dialog-store";

export function DialogContainer() {
  const { dialogOpen, dialogTitle, dialogDescription, dialogContent, dialogFooter, closeDialog } = useDialogStore(
    useShallow((state) => state)
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <section role="dialog-content">{dialogContent}</section>

        {dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
