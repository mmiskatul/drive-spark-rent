"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, type ReactNode, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RouteChangeLoader } from "@/components/RouteChangeLoader";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Suspense fallback={null}>
          <RouteChangeLoader />
        </Suspense>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
