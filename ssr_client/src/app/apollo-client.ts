import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        uri: process.env.SERVER_URI ? process.env.SERVER_URI + "/graphql" : "/api/graphql",
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
