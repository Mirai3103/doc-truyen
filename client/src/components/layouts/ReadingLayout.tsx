import { Box, Flex, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import MyHeader from "../Header";

export default function ReadingLayout() {
    const { colorScheme } = useMantineTheme();
    return (
        <Flex direction={"column"} w={"100vw"} h="100vh" className="overflow-hidden">
            <MyHeader withBurgerMenu />
            <Flex className="overflow-hidden">
                <Flex
                    w={"100%"}
                    style={{
                        minHeight: "100vh",
                    }}
                    mah={"100vh"}
                    direction="column"
                    className="overflow-y-auto has-scrollbar"
                >
                    <Box className="px-0 more-md:px-3" bg={colorScheme === "dark" ? "dark" : "gray.1"}>
                        <div
                            id="top"
                            style={{
                                visibility: "hidden",
                            }}
                        ></div>
                        <Outlet />
                    </Box>
                    <Footer
                        links={[
                            { link: "https://twitter.com/mantine", label: "Twitter" },
                            { link: "https://youtube.com/mantine", label: "YouTube" },
                            { link: "https://instagram.com/mantine", label: "Instagram" },
                        ]}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
