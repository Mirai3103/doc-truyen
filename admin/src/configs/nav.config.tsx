import { MdSpaceDashboard } from "react-icons/md";
import { FaUserTie, FaTag, FaBookOpen } from "react-icons/fa";
interface NavItemProps {
  href?: string;
  icon?: React.ElementType;
  label: string;
}

export const appNavItems: NavItemProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: MdSpaceDashboard,
  },
  {
    href: "/dashboard/authors",
    label: "Tác giả",
    icon: FaUserTie,
  },
  {
    href: "/dashboard/tags",
    label: "Thẻ",
    icon: FaTag,
  },
  {
    label: "Truyện",
    href: "/dashboard/comics",
    icon: FaBookOpen,
  },
];
