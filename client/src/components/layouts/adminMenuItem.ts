import { appNavigate } from "@/routes";
import { IconBookUpload, IconChartAreaFilled, IconHome, IconTag, IconUserEdit, IconUsers } from "@tabler/icons-react";
import { MenuItemProps } from "./appMenuItems";
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
        link: "/admin/analysis",
        label: "Analysis",
        icon: IconChartAreaFilled,
        action: () => {
            appNavigate("/admin/analysis");
        },
    },
    {
        link: "/admin/upload-comic",
        label: "Đăng truyện",
        icon: IconBookUpload,
        action: () => {
            appNavigate("/admin/upload-comic");
        },
    },
    {
        link: "/admin/user-management",
        label: "Quản lý người dùng",
        icon: IconUserEdit,
        action: () => {
            appNavigate("/admin/user-management");
        },
    },
    {
        link: "/admin/team-management",
        label: "Quản lý nhóm",
        icon: IconUsers,
        action: () => {
            appNavigate("/admin/team-management");
        },
    },
    {
        link: "/admin/tag-management",
        label: "Quản lý loại truyện",
        icon: IconTag,
        action: () => {
            appNavigate("/admin/tag-management");
        },
    },
    {
        link: "/admin/chapter-management",
        label: "Quản lý chương truyện",
        icon: IconTag,
        action: () => {
            appNavigate("/admin/chapter-management");
        },
    },
];

export const adminSection = [
    {
        withAuth: false,
        items: menuData,
        name: "Chung",
    },
];
