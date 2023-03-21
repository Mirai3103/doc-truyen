import React, { useState } from "react";
import { themeOverride } from "./mantine.config";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    ...themeOverride,
                    colorScheme,
                }}
                withGlobalStyles
                withNormalizeCSS
            >
                <RouterProvider router={routes} />
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
