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
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Navbar shouldHideOnScroll maxWidth="xl" onMenuOpenChange={setIsMenuOpen}>
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
                <NavbarBrand>
                    <Link className="h-6" href="/">
                        <Logo />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {headerNavigationItems.map((item, index) => (
                    <NavbarItem key={`${item.label}-${index}`}>
                        <Link color="foreground" href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <SearchButton />
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    <Button variant="flat" onClick={onOpen}>
                        Đăng nhập
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Đăng ký
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <DarkModeToggleButton />
                </NavbarItem>
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
