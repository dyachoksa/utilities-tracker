import { Loader2Icon } from "lucide-react";

import { cn } from "~/lib/utils";

type Props = React.ComponentProps<"div">;

export const LoadingIndicator = ({ className, ...props }: Props) => {
  return (
    <div className={cn("text-primary/75 flex h-48 items-center justify-center", className)} {...props}>
      <Loader2Icon className="size-10 animate-spin" />
    </div>
  );
};
