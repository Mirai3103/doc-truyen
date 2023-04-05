import { Box, BoxProps, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import LogoImg from "../assets/lg.png";
interface LogoProps extends BoxProps {}

export default function Logo(props: LogoProps) {
    return (
        <Box {...props}>
            <Link to="/">
                <Image src={LogoImg} alt="Logo" fit="contain" w={"100%"} h={"auto"} />
            </Link>
        </Box>
    );
}
