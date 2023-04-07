import store from "@/redux/store";
import { setToken } from "@/redux/userSplice";
import { appNavigate } from "@/routes";
import {
    IconBookmark,
    IconCreditCard,
    IconFingerprint,
    IconHistory,
    IconHome,
    IconKey,
    IconListSearch,
    IconLogout,
    IconMessage,
    IconTrendingUp,
    IconUser,
} from "@tabler/icons-react";

interface MenuItemProps {
    link: string;
    label: string;
    icon: React.FC<{ size?: number }>;
    action?: () => void;
}
export const menuData: MenuItemProps[] = [
    {
        link: "/",
        label: "Trang chủ",
        icon: IconHome,
        action: () => {
            appNavigate("/");
        },
    },
    {
        link: "/trending",
        label: "Trending",
        icon: IconTrendingUp,
        action: () => {
            appNavigate("/trending");
        },
    },
    {
        link: "/noitificaton",
        label: "Thông báo",
        icon: IconMessage,
        action: () => {
            appNavigate("/noitificaton");
        },
    },
    {
        link: "/advance-search",
        label: "Tìm kiếm ",
        icon: IconListSearch,
        action: () => {
            appNavigate("/advance-search");
        },
    },
    {
        link: "/donate",
        label: "Ủng hộ",
        icon: IconCreditCard,
        action: () => {
            appNavigate("/donate");
        },
    },
];
export const noAuthMenu: MenuItemProps[] = [
    {
        link: "/login",
        label: "Đăng nhập",
        icon: IconFingerprint,
        action: () => {
            appNavigate("/login");
        },
    },
    {
        link: "/register",
        label: "Đăng ký",
        icon: IconKey,
        action: () => {
            appNavigate("/register");
        },
    },
];

export const authMenu: MenuItemProps[] = [
    {
        link: "/profile",
        label: "Thông tin tài khoản",
        icon: IconUser,
        action: () => {
            appNavigate("/profile");
        },
    },
    {
        link: "/follow",
        label: "Truyện đã theo dõi",
        icon: IconBookmark,
        action: () => {
            appNavigate("/follow");
        },
    },
    {
        link: "/history",
        label: "Lịch sử đọc",
        icon: IconHistory,
        action: () => {
            appNavigate("/history");
        },
    },
    {
        link: "/logout",
        label: "Đăng xuất",
        icon: IconLogout,
        action: () => {
            store.dispatch(
                setToken({
                    accessToken: "",
                    refreshToken: "",
                })
            );
            appNavigate("/");
        },
    },
];
