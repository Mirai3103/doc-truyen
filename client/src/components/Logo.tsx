import React from "react";
import LogoImg from "../assets/lg.png";
import { Image, Box, BoxProps } from "@mantine/core";
interface LogoProps extends BoxProps {}

export default function Logo(props: LogoProps) {
    return (
        <Box {...props}>
            <Image src={LogoImg} alt="Logo" fit="contain" w={"100%"} h={"auto"} />
        </Box>
    );
}
