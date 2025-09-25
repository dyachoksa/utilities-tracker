"use client";

import type { Tariff } from "~/types/tariffs";

import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { Button } from "~/components/ui/button";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useDeleteTariff } from "~/hooks/use-tariff-queries";

interface Props {
  tariff: Tariff;
}

export function FormTariffDelete({ tariff }: Props) {
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useDeleteTariff(tariff.id, tariff.providerId);

  const handleDelete = () => {
    action.mutate(undefined, {
      onSuccess: async () => {
        closeDialog();
        toast.success("Tariff deleted", {
          description: `Tariff '${tariff.name}' has been successfully deleted`,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-800">Are you sure you want to delete tariff &apos;{tariff.name}&apos;?</p>
      <p className="text-sm text-gray-700">
        This action cannot be undone. All related data will be permanently removed.
      </p>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
        <Button disabled={action.isPending} onClick={handleDelete}>
          {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Yes, delete tariff
        </Button>
        <Button variant="outline" onClick={closeDialog}>
          No, cancel
        </Button>
      </div>
    </div>
  );
}
