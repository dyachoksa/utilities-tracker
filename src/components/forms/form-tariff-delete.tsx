"use client";

import type { Tariff } from "~/types/tariffs";

import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useDeleteTariff } from "~/hooks/use-tariff-queries";

interface Props {
  tariff: Tariff;
}

export function FormTariffDelete({ tariff }: Props) {
  const t = useTranslations("forms");
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const action = useDeleteTariff(tariff.id, tariff.providerId);

  const handleDelete = () => {
    action.mutate(undefined, {
      onSuccess: async () => {
        closeDialog();
        toast.success(t("tariff.delete.success"), {
          description: `${tariff.name} ${t("tariff.delete.successDescription")}`,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-800">{t("tariff.delete.confirm")} &apos;{tariff.name}&apos;?</p>
      <p className="text-sm text-gray-700">{t("tariff.delete.warning")}</p>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
        <Button disabled={action.isPending} onClick={handleDelete}>
          {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("tariff.delete.submit")}
        </Button>
        <Button variant="outline" onClick={closeDialog}>
          {t("tariff.delete.cancel")}
        </Button>
      </div>
    </div>
  );
}
