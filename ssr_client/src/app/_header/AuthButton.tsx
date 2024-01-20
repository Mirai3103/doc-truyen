import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    NavbarItem,
    User,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { useRecoilState } from "recoil";
import userStore from "@/store/userStore";
import LoginModal from "@/components/LoginModal";
import { userMenuItem } from "./UserMenu";
import NextLink from "next/link";

export default function AuthButton() {
    const [userState, setUserState] = useRecoilState(userStore);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const userMenuItemNodes = userMenuItem.map((item) => (
        <DropdownItem startContent={item.icon} key={item.label} as={NextLink} href={item.href} color="primary">
            {item.label}
        </DropdownItem>
    ));

    return (
        <>
            {!userState.isAuthenticated && (
                <>
                    <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />

                    <NavbarItem className="hidden lg:flex">
                        <Button variant="flat" onClick={onOpen}>
                            Đăng nhập
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/dang-ly" variant="flat">
                            Đăng ký
                        </Button>
                    </NavbarItem>
                </>
            )}
            {userState.isAuthenticated && (
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        <User
                            as="button"
                            avatarProps={{
                                isBordered: true,
                                src: userState.profile!.avatarUrl || "https://placewaifu.com/image/200/200",
                            }}
                            className="transition-transform"
                            description={userState.profile!.email}
                            name={userState.profile?.displayName || userState.profile!.userName}
                        />
                    </DropdownTrigger>

                    <DropdownMenu aria-label="User Actions" variant="flat">
                        {[
                            ...userMenuItemNodes,
                            <DropdownItem
                                startContent={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                        />
                                    </svg>
                                }
                                key="logout"
                                color="danger"
                            >
                                Đăng xuất
                            </DropdownItem>,
                        ]}
                    </DropdownMenu>
                </Dropdown>
            )}
        </>
    );
}
