import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectIsAuthenticated, selectUserProfile } from "@/redux/userSplice";
import { Avatar, Button, Group, Menu, Text } from "@mantine/core";
import { IconBookmark, IconHistory, IconLogout, IconUser } from "@tabler/icons-react";

export default function AuthMenu() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const userProfile = useAppSelector(selectUserProfile);

    if (isAuthenticated)
        return (
            <Menu shadow="md" width={300} withArrow>
                <Menu.Target>
                    <Group spacing="sm" className="cursor-pointer">
                        <Avatar size={40} src={userProfile?.avatarUrl} radius={30} />
                        <Text fz="md" fw={700}>
                            {userProfile?.displayName}
                        </Text>
                    </Group>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item className="md:text-lg" icon={<IconUser />}>
                        <div>Thông tin tài khoản</div>
                    </Menu.Item>
                    <Menu.Item className="md:text-lg" icon={<IconBookmark />}>
                        <div>Truyện đã theo dõi</div>
                    </Menu.Item>
                    <Menu.Item className="md:text-lg" icon={<IconHistory />}>
                        <div>Lịch sử đọc </div>
                    </Menu.Item>
                    <Menu.Item className="md:text-lg" icon={<IconLogout />}>
                        <div>Đăng xuất</div>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    return (
        <Group mx={4} spacing={4}>
            <Button color={"blue"} variant="default">
                Log in
            </Button>
            <Button color={"blue"} variant={"filled"}>
                Sign up
            </Button>
        </Group>
    );
}
