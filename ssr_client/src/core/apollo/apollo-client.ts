"use client";

import { ApolloLink, HttpLink, concat } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import Cookies from "universal-cookie";
/**
 * Make a Apollo client compatible with Client components
 * This requires you to wrap up the parent(s) with ApolloNextAppProvider
 * @see {@link https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/}
 */
export function makeClient() {
    const httpLink = new HttpLink({
        uri: process.env.SERVER_URI ? process.env.SERVER_URI + "/graphql" : "/api/graphql",
    });
    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        const cookies = new Cookies();
        const token = cookies.get("accessToken");
        if (token) {
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : "",
                },
            });
        }
        return forward(operation);
    });
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      concat(authMiddleware, httpLink),
                  ])
                : concat(authMiddleware, httpLink),
    });
}
