import { IResourceItem } from "@refinedev/core";
import { AiFillDashboard, AiFillBook, AiFillTags } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa6";
export const resources: IResourceItem[] = [
  {
    name: "Dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <AiFillDashboard />,
    },
  },
  {
    name: "comic",
    list: "/comic",
    create: "/comic/create",
    edit: "/comic/edit/:id",
    show: "/comic/show/:id",
    meta: {
      label: "Quản lý truyện",
      icon: <AiFillBook />,
    },
  },
  {
    name: "chapter",
    list: "/comic/:id/chapter",
    create: "/comic/:id/chapter/create",
    edit: "/comic/:id/chapter/edit/:id",
    show: "/comic/:id/chapter/show/:id",
  },
  {
    name: "tag",
    list: "/tag",
    create: "/tag/create",
    edit: "/tag/edit/:id",
    show: "/tag/show/:id",
    meta: {
      label: "Quản lý tag",
      icon: <AiFillTags />,
    },
  },
  {
    name: "author",
    list: "/author",
    create: "/author/create",
    edit: "/author/edit/:id",
    show: "/author/show/:id",
    meta: {
      label: "Quản lý tác giả",
      icon: <FaUserTie />,
    },
  },
];
