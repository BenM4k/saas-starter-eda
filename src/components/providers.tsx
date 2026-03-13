"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/next";
import { ThemeProvider } from "./theme-provider";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </ThemeProvider>
    </ClerkProvider>
  );
}
