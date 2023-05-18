import { withAuth } from "@/HOC/authGuard";
import { Role } from "@/redux/userSplice";
import { Box, Flex, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import MyHeader from "../Header";
import { SideBar } from "./SideBar";
import { adminSection } from "./adminMenuItem";

const AdminLayoutWithAuth = withAuth(AdminLayout, Role.CREATOR);
export default AdminLayoutWithAuth;
function AdminLayout() {
    const { colorScheme } = useMantineTheme();

    return (
        <Flex direction={"column"} w={"100vw"} h="100vh" className="overflow-hidden">
            <MyHeader burgerMenuItems={adminSection} />
            <Flex className="overflow-hidden">
                <SideBar sections={adminSection} h={"100%"} className="hidden lg:block" />
                <Flex
                    w={"100%"}
                    style={{
                        minHeight: "100vh",
                    }}
                    mah={"100vh"}
                    direction="column"
                    className="overflow-y-auto has-scrollbar"
                >
                    <Box className="px-0 grow more-md:px-3" bg={colorScheme === "dark" ? "dark" : "gray.1"}>
                        <div
                            id="top"
                            style={{
                                visibility: "hidden",
                            }}
                        ></div>
                        <Outlet />
                        <Footer
                            links={[
                                { link: "https://twitter.com/mantine", label: "Twitter" },
                                { link: "https://youtube.com/mantine", label: "YouTube" },
                                { link: "https://instagram.com/mantine", label: "Instagram" },
                            ]}
                        />
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}
