"use client";

import type { Provider } from "~/types/providers";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { Button } from "~/components/ui/button";
import { useDialogStore } from "~/hooks/use-dialog-store";
import { fetchProvidersKey, useDeleteProvider } from "~/hooks/use-provider-queries";

interface Props {
  provider: Provider;
}

export function FormProviderDelete({ provider }: Props) {
  const closeDialog = useDialogStore(useShallow((state) => state.closeDialog));
  const queryClient = useQueryClient();
  const router = useRouter();
  const action = useDeleteProvider(provider.id);

  const handleDelete = () => {
    action.mutate(undefined, {
      onSuccess: async () => {
        closeDialog();
        toast.success("Provider deleted", {
          description: `Provider '${provider.name}' has been successfully deleted`,
        });

        await queryClient.invalidateQueries({
          queryKey: fetchProvidersKey({ householdId: provider.householdId }),
          exact: true,
        });
        router.push(`/app/households/${provider.householdId}`);
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-800">Are you sure you want to delete provider &apos;{provider.name}&apos;?</p>
      <p className="text-sm text-gray-700">
        This action cannot be undone. All related data will be permanently removed.
      </p>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row-reverse">
        <Button disabled={action.isPending} onClick={handleDelete}>
          {action.isPending ? <Loader2Icon className="animate-spin" /> : null} Yes, delete provider
        </Button>
        <Button type="button" variant="outline" onClick={closeDialog} disabled={action.isPending}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
