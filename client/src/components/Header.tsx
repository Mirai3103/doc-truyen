import { useAppSelector } from "@/redux/hook";
import { selectIsAuthenticated, selectUserProfile } from "@/redux/userSplice";
import { Autocomplete, Avatar, Box, BoxProps, Flex, Group, Header, Menu, Text, createStyles, rem } from "@mantine/core";
import { IconMenu2, IconSearch } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthMenu from "./AuthMenu";
import Logo from "./Logo";
import { MenuItemProps, defaultSection } from "./layouts/appMenuItems";
import SearchBox from "./SearchBox";

const useStyles = createStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: rem(42),
            display: "flex",
            alignItems: "center",
            width: "100%",
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        "&:active": theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("md")]: {
            display: "none",
        },
    },
}));

interface Props extends BoxProps {
    withBurgerMenu?: boolean;
    burgerMenuItems?: {
        withAuth?: boolean;
        withNoAuth?: boolean;
        items: MenuItemProps[];
        name: string;
    }[];
}
export default function MyHeader({ withBurgerMenu = false, burgerMenuItems = defaultSection, ...props }: Props) {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const userProfile = useAppSelector(selectUserProfile);
    return (
        <Box {...props}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: "100%" }}>
                    <Flex columnGap={"lg"} justify={"center"} align="center" sx={{ height: "100%" }}>
                        <Logo w={150} />
                    </Flex>
                    <Group className={"hidden sm:flex items-center grow"} maw={"700px"} spacing={0}>
                        <SearchBox />
                    </Group>

                    <Group
                        sx={{ height: "100%" }}
                        spacing={0}
                        className={withBurgerMenu ? "hidden" : classes.hiddenMobile}
                    >
                        <AuthMenu />
                    </Group>
                    <Group className={"sm:hidden flex justify-end items-center grow"} maw={"400px"} spacing={0}>
                        <Menu shadow="md" width={300} withArrow>
                            <Menu.Target>
                                <IconSearch size={"25"} stroke={1.5} />
                            </Menu.Target>
                            <Menu.Dropdown>
                                <SearchBox />
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    <Menu shadow="md" width={300} withArrow>
                        <Menu.Target>
                            <IconMenu2 size={"35"} className={withBurgerMenu ? "" : classes.hiddenDesktop} />
                        </Menu.Target>
                        <Menu.Dropdown>
                            {isAuthenticated && (
                                <Menu.Item>
                                    <Group spacing="sm" className="cursor-pointer">
                                        <Avatar
                                            size={40}
                                            radius={30}
                                            placeholder={userProfile?.displayName.split(" ").pop()?.charAt(0)}
                                        />
                                        <Text fz="md" fw={700}>
                                            {userProfile?.displayName}
                                        </Text>
                                    </Group>
                                </Menu.Item>
                            )}

                            {burgerMenuItems.map((section, index) => {
                                if (!isAuthenticated && section.withAuth) return <div key={section.name}></div>;
                                if (isAuthenticated && section.withNoAuth) return <div key={section.name}></div>;
                                const list = section.items.map((item) => {
                                    return (
                                        <Menu.Item
                                            onClick={item.action}
                                            className="md:text-lg"
                                            key={item.label}
                                            icon={<item.icon />}
                                        >
                                            <div>{item.label}</div>
                                        </Menu.Item>
                                    );
                                });
                                return (
                                    <React.Fragment key={section.name}>
                                        <Menu.Divider />
                                        <Menu.Label>{section.name}</Menu.Label>
                                        {list}
                                    </React.Fragment>
                                );
                            })}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Header>
        </Box>
    );
}
