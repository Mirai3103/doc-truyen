import { authLink, tryAuthenticate } from "@/utils/axios";
// eslint-disable-next-line

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications, notifications } from "@mantine/notifications";
import React, { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { themeOverride } from "./mantine.config";
import routes from "./routes";
console.log(process.env);
const client = new ApolloClient({
    uri: process.env.VITE_GRAPHQL_URL || "/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: ApolloLink.from([
        authLink,
        new HttpLink({
            uri: process.env.VITE_GRAPHQL_URL || "/graphql",
        }),
    ]),
});
function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    useHotkeys([["mod+J", () => toggleColorScheme()]]);
    React.useEffect(() => {
        notifications.show({
            title: "Lưu ý",
            message: "Tất cả dữ liệu ở web này được ăn cắp cho mục đích học tập, không có ý định nào khác cả :)",
            color: "yellow",
            autoClose: 15000,
            styles: (theme) => ({
                title: {
                    fontSize: theme.fontSizes.xl,
                    fontStyle: "700",
                },
                body: {
                    fontSize: theme.fontSizes.lg,
                },
            }),
        });
        tryAuthenticate();
    }, []);
    return (
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
                <ModalsProvider>
                    <Notifications position="top-right" />
                    <ApolloProvider client={client}>
                        <RouterProvider router={routes} />
                    </ApolloProvider>
                </ModalsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
