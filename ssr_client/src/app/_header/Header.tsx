"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import Logo from "@/components/Logo";
import SearchButton from "./SearchButton";
import DarkModeToggleButton from "./DarkModeToggleButton";
import LoginModal from "@/components/LoginModal";
import AuthButton from "./AuthButton";
import CategoryNavItem from "./CategoryNavItem";
import { advanceSearchHref } from "@/core/utils";

interface HeaderNavigationItem {
  label: string;
  href?: string;
  childrens?: HeaderNavigationItem[];
}

const headerNavigationItems: HeaderNavigationItem[] = [
  {
    label: "Thể loại",
    childrens: [
      {
        label: "Thể loại 1",
        href: "#",
      },
      {
        label: "Thể loại 2",
        href: "#",
      },
      {
        label: "Thể loại 3",
        href: "#",
      },
    ],
  },
  {
    label: "Top truyện",
    href: "#",
  },
  {
    label: "Tìm truyện",
    href: "/tim-kiem-nang-cao",
  },
];

export default function Header() {
  return (
    <Navbar shouldHideOnScroll maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link className="h-6" href="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <CategoryNavItem />
        <NavbarItem>
          <Link
            color="foreground"
            href={advanceSearchHref({
              sortField: "totalViewCount",
              sortType: "desc",
            })}
          >
            {`Top truyện`}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/tim-kiem-nang-cao"}>
            {`Tìm truyện`}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SearchButton />
        </NavbarItem>
        <NavbarItem>
          <DarkModeToggleButton />
        </NavbarItem>
        <AuthButton />
      </NavbarContent>
      <NavbarMenu>
        {headerNavigationItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === headerNavigationItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
