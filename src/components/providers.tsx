"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export default function AppProviders({ children }: PropsWithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
