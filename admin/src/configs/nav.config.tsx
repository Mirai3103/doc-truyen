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
    href: "/",
    icon: MdSpaceDashboard,
  },
  {
    href: "/authors",
    label: "Tác giả",
    icon: FaUserTie,
  },
  {
    href: "/tags",
    label: "Thẻ",
    icon: FaTag,
  },
  {
    label: "Truyện",
    href: "/comics",
    icon: FaBookOpen,
  },
];
