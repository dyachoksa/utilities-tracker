"use client";

import type { Household } from "~/types/households";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useDeleteHousehold } from "~/hooks/use-household-queries";

interface Props {
  household: Household;
}

export const FormHouseholdDelete = ({ household }: Props) => {
  const t = useTranslations("forms");
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const router = useRouter();
  const action = useDeleteHousehold(household.id);

  const handleDelete = () => {
    action.mutate(undefined, {
      onSuccess: () => {
        closeDialog();
        toast.success(t("household.delete.success"), {
          description: `${household.name} ${t("household.delete.successDescription")}`,
        });
        router.push("/app/households");
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-800">{t("household.delete.confirm")} &apos;{household.name}&apos;?</p>
      <p className="text-sm text-gray-700">{t("household.delete.warning")}</p>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
        <Button disabled={action.isPending} onClick={handleDelete}>
          {action.isPending ? <Loader2Icon className="animate-spin" /> : null} {t("household.delete.submit")}
        </Button>
        <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
          {t("common.buttons.cancel")}
        </Button>
      </div>
    </div>
  );
};
