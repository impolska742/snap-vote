"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient();

export default function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
