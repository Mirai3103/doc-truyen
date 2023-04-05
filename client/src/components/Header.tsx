import { Autocomplete, Box, BoxProps, Button, createStyles, Flex, Group, Header, Menu, rem } from "@mantine/core";
import { IconMenu2, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { menuData, noAuthMenu } from "./layouts/SideBar";
import Logo from "./Logo";

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
}

export default function MyHeader({ withBurgerMenu = false, ...props }: Props) {
    const { classes } = useStyles();
    const navigate = useNavigate();
    return (
        <Box {...props}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: "100%" }}>
                    <Flex columnGap={"lg"} justify={"center"} align="center" sx={{ height: "100%" }}>
                        <Logo w={150} />
                    </Flex>
                    <Group className={"hidden sm:flex items-center grow"} maw={"700px"} spacing={0}>
                        <Autocomplete
                            w={"100%"}
                            placeholder="Search"
                            icon={<IconSearch size="1rem" stroke={1.5} />}
                            data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
                        />
                    </Group>

                    <Group
                        sx={{ height: "100%" }}
                        spacing={0}
                        className={withBurgerMenu ? "hidden" : classes.hiddenMobile}
                    >
                        <Group mx={4} spacing={4}>
                            <Button color={"blue"} variant="default">
                                Log in
                            </Button>
                            <Button color={"blue"} variant={"filled"}>
                                Sign up
                            </Button>
                        </Group>
                    </Group>
                    <Group className={"sm:hidden flex justify-end items-center grow"} maw={"400px"} spacing={0}>
                        <Menu shadow="md" width={300} withArrow>
                            <Menu.Target>
                                <IconSearch size={"25"} stroke={1.5} />
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Autocomplete
                                    w={"100%"}
                                    placeholder="Search"
                                    icon={<IconSearch size="1rem" stroke={1.5} />}
                                    data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
                                />
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    <Menu shadow="md" width={300} withArrow>
                        <Menu.Target>
                            <IconMenu2 size={"35"} className={withBurgerMenu ? "" : classes.hiddenDesktop} />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Chung</Menu.Label>

                            {menuData.map((item) => {
                                return (
                                    <Menu.Item
                                        onClick={item.link ? () => navigate(item.link) : () => {}}
                                        className="md:text-lg"
                                        key={item.label}
                                        icon={<item.icon />}
                                    >
                                        <div>{item.label}</div>
                                    </Menu.Item>
                                );
                            })}

                            <Menu.Divider />

                            <Menu.Label>Tài khoản</Menu.Label>
                            {noAuthMenu.map((item) => {
                                return (
                                    <Menu.Item
                                        onClick={item.link ? () => navigate(item.link) : () => {}}
                                        className="text-lg"
                                        key={item.label}
                                        icon={<item.icon />}
                                    >
                                        <div>{item.label}</div>
                                    </Menu.Item>
                                );
                            })}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Header>
        </Box>
    );
}
