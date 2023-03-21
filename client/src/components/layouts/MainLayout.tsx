import React from "react";
import { Box, Container } from "@mantine/core";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import MyHeader from "../Header";

export default function MainLayout() {
    return (
        <Container size={"xl"}>
            <MyHeader />
            <Box mih={"100vh"}>
                <Outlet />
            </Box>

            <Footer
                links={[
                    { link: "https://twitter.com/mantine", label: "Twitter" },
                    { link: "https://youtube.com/mantine", label: "YouTube" },
                    { link: "https://instagram.com/mantine", label: "Instagram" },
                ]}
            />
        </Container>
    );
}
