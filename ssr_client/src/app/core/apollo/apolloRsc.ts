import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { NextSSRApolloClient, NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";

/**
 * Make a Apollo client compatible with Server components
 * This does not require use of any providers
 * @see {@link https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/}
 */
export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
        link: new HttpLink({
            uri: process.env.SERVER_URI ? process.env.SERVER_URI + "/graphql" : "/api/graphql",
        }),
        cache: new NextSSRInMemoryCache(),
    });
});
