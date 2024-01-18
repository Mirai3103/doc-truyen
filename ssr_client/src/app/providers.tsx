// app/providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { makeClient } from "@/core/apollo/apollo-client";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <RecoilRoot>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <ApolloNextAppProvider makeClient={makeClient}>
                    <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
                </ApolloNextAppProvider>
            </NextThemesProvider>
        </RecoilRoot>
    );
}
