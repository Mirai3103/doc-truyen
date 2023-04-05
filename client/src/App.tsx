import { authLink } from "@/utils/axios";
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { themeOverride } from "./mantine.config";
import routes from "./routes";
const client = new ApolloClient({
    uri: "http://192.168.2.131:3000/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: ApolloLink.from([
        authLink,
        new HttpLink({
            uri: "http://192.168.2.131:3000/graphql",
        }),
    ]),
});
function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    useHotkeys([["mod+J", () => toggleColorScheme()]]);

    return (
        <GoogleOAuthProvider clientId="658600165325-3uk2cg496n3ed5n7snl0vi00suh7hd7r.apps.googleusercontent.com">
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    theme={{
                        ...themeOverride,
                        colorScheme,
                        components: {
                            Title: {
                                defaultProps: {
                                    color: colorScheme === "dark" ? "gray.1" : "dark",
                                },
                            },
                            Text: {
                                defaultProps: {
                                    color: colorScheme === "dark" ? "gray.1" : "dark",
                                },
                            },
                        },
                    }}
                    withCSSVariables
                    withGlobalStyles
                    withNormalizeCSS
                >
                    <ApolloProvider client={client}>
                        <RouterProvider router={routes} />
                    </ApolloProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
