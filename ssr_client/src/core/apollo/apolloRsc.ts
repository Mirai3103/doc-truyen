import { ApolloLink, HttpLink, concat } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { cookies } from "next/headers";

/**
 * Make a Apollo client compatible with Server components
 * This does not require use of any providers
 * @see {@link https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/}
 */
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const cookiesStore = cookies();
  const token = cookiesStore.get("accessToken")?.value;
  if (token) {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  }
  return forward(operation);
});
const httpLink = new HttpLink({
  uri: process.env.SERVER_URI
    ? process.env.SERVER_URI + "/graphql"
    : "/api/graphql",
});
export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new NextSSRInMemoryCache(),
  });
});
