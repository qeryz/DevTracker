"use client";

import { ReactNode } from "react";
import { ReactQueryProvider } from "./QueryClientProvider";
import { AuthProvider } from "./AuthProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthProvider>
  );
};
