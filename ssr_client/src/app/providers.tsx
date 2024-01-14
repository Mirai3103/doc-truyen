// app/providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { ReactNode, useState } from "react";
import { makeClient } from "./core/apollo/apollo-client";
import { useRouter } from "next/navigation";
export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </ApolloNextAppProvider>
    );
}
