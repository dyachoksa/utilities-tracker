"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchInterval: false,
        },
      },
    });
  }

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
};
