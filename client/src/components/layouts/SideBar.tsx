import {
    createStyles,
    FlexProps,
    getStylesRef,
    Navbar,
    rem,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import {
    IconCreditCard,
    IconFingerprint,
    IconHome,
    IconKey,
    IconListSearch,
    IconMessage,
    IconTrendingUp,
} from "@tabler/icons-react";

import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background,
    },

    version: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.1
        ),
        color: theme.white,
        fontWeight: 700,
    },

    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.1
        )}`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.1
        )}`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
                0.1
            ),
        },
    },

    linkIcon: {
        ref: getStylesRef("icon"),
        color: theme.white,
        opacity: 0.75,
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
                0.15
            ),
            [`& .${getStylesRef("icon")}`]: {
                opacity: 0.9,
            },
        },
    },
}));
export const menuData = [
    { link: "/", label: "Trang chủ", icon: IconHome },
    { link: "/trending", label: "Trending", icon: IconTrendingUp },
    { link: "/noitificaton", label: "Thông báo", icon: IconMessage },
    { link: "/advance-search", label: "Tìm kiếm ", icon: IconListSearch },
    { link: "/donate", label: "Ủng hộ", icon: IconCreditCard },
];
export const noAuthMenu = [
    { link: "/login", label: "Đăng nhập", icon: IconFingerprint },
    { link: "/register", label: "Đăng ký", icon: IconKey },
];
interface SideBarProps extends FlexProps {}

export function SideBar({ className, ...props }: SideBarProps) {
    const { classes } = useStyles();
    const { colorScheme } = useMantineColorScheme();
    const linksMenu = menuData.map((item) => <SideBarItem item={item} key={item.label} />);
    const noAuthLinksMenu = noAuthMenu.map((item) => <SideBarItem item={item} key={item.label} />);
    const { primaryColor } = useMantineTheme();

    const background: any = colorScheme === "dark" ? "dark.9" : primaryColor + ".6";
    return (
        <Navbar height={700} width={{ sm: 250 }} bg={background} p="md" className={" " + (className || "")} {...props}>
            <Navbar.Section grow>{linksMenu}</Navbar.Section>

            <Navbar.Section className={classes.footer}>{noAuthLinksMenu}</Navbar.Section>
        </Navbar>
    );
}
interface SideBarItemProps {
    item: {
        link: string;
        label: string;
        icon: any;
    };
}
function SideBarItem({ item }: SideBarItemProps) {
    const { classes, cx } = useStyles();
    const location = useLocation();
    return (
        <Link
            className={
                cx(classes.link, {
                    [classes.linkActive]:
                        location.pathname === item.link || (location.pathname === "/" && item.link === "/"),
                }) + " my-1"
            }
            to={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5 + ""} />
            <span>{item.label}</span>
        </Link>
    );
}
