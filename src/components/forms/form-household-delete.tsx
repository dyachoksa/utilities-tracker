import type { Household } from "~/types/households";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { Button } from "~/components/ui/button";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { useDeleteHousehold } from "~/hooks/use-household-queries";

interface Props {
  household: Household;
}

export const FormHouseholdDelete = ({ household }: Props) => {
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const router = useRouter();
  const action = useDeleteHousehold(household.id);

  const handleDelete = () => {
    action.mutate(undefined, {
      onSuccess: () => {
        closeDialog();
        toast.success("Household deleted", {
          description: `Household '${household.name}' has been successfully deleted`,
        });
        router.push("/app/households");
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-800">Are you sure you want to delete household &apos;{household.name}&apos;?</p>
      <p className="text-sm text-gray-700">
        This action cannot be undone. All related data will be permanently removed.
      </p>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
        <Button disabled={action.isPending} onClick={handleDelete}>
          {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Yes, delete household
        </Button>
        <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
