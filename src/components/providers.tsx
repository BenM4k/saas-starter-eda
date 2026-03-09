"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/next";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </ClerkProvider>
  );
}
