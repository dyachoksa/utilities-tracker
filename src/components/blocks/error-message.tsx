import { AlertCircleIcon } from "lucide-react";
import { useMemo } from "react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

interface Props {
  message: string;
  error?: Error | string[];
}

export const ErrorMessage = ({ message, error }: Props) => {
  const details = useMemo(() => {
    if (!error) return null;

    if (Array.isArray(error)) {
      return (
        <ul className="list-inside list-disc text-sm">
          {error.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    return error.message;
  }, [error]);

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{message}</AlertTitle>
      {details && <AlertDescription>{details}</AlertDescription>}
    </Alert>
  );
};
