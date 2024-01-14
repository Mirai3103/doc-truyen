// app/providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloProvider } from "@apollo/client";
import { ReactNode, useState } from "react";
import createApolloClient from "./apollo-client";
const client = createApolloClient();
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={client}>
            <NextUIProvider>{children}</NextUIProvider>
        </ApolloProvider>
    );
}
