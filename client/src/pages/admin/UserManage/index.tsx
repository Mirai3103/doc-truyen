import { useFindAllUsersQuery } from "@/gql/generated/graphql";
import { useAppSelector } from "@/redux/hook";
import { Role, roleToString, selectRole } from "@/redux/userSplice";
import { toDateTimeFormat } from "@/utils/dateUtils";
import { Flex, Loader, Menu, Pagination, Stack, Table, TextInput, Title } from "@mantine/core";
import { useDebouncedState, useDisclosure, usePagination } from "@mantine/hooks";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";
import UpdateUserModal, { IUserUpdateDTO } from "./UpdateUserModal";

export default function UserManagePage() {
    const { active, setPage } = usePagination({ total: 100, initialPage: 1 });
    const [search, setSearch] = useDebouncedState("", 1000);
    const [opened, { open, close }] = useDisclosure(false);
    const [openedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
    const [selectedUser, setSelectedUser] = React.useState<IUserUpdateDTO | null>(null);
    const { data, loading, error, refetch } = useFindAllUsersQuery({
        variables: {
            page: active,
            limit: 20,
            keywords: search,
        },
    });
    const userRole = useAppSelector(selectRole);

    const totalPage = Math.ceil((data?.users?.count || 20) / 20);
    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.currentTarget.value);
        },
        [setSearch]
    );
    React.useEffect(() => {
        refetch({
            keywords: search,
            page: active,
            limit: 20,
        });
    }, [active, data, refetch, search]);
    const onSaved = useCallback(() => {
        refetch({
            keywords: search,
            page: active,
            limit: 20,
        });
    }, [active, refetch, search]);
    if (userRole !== Role.ADMIN) {
        return <Navigate to="/admin/comic-manage" />;
    }
    return (
        <Stack className="p-2">
            <Flex>
                <Title order={2}>Quản lý người dùng</Title>
            </Flex>
            <UpdateUserModal
                onSaved={onSaved}
                user={selectedUser}
                opened={openedUpdateModal}
                close={closeUpdateModal}
            />

            <Stack spacing={"lg"}>
                <Flex justify={"center"}>
                    <TextInput
                        onChange={handleSearch}
                        defaultValue={search}
                        className="grow shrink"
                        maw={500}
                        label="Tìm kiếm người dùng"
                        placeholder="Theo tên"
                    />
                </Flex>
                <Title order={4} ml={"sm"}>
                    Danh sách người dùng
                </Title>

                <Table fontSize={"md"} striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>User name</th>
                            <th>Email</th>
                            <th>Giới thiệu</th>
                            <th>Vai trò</th>
                            <th>Tham gia ngày </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            data?.users?.users.map((user) => (
                                <tr
                                    key={user._id}
                                    onClick={() =>
                                        setSelectedUser({
                                            ...user,
                                            description: user.description || "",
                                        })
                                    }
                                >
                                    <td>{user.displayName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: user.description || "",
                                            }}
                                        ></p>
                                    </td>
                                    <td>{roleToString(user.role)}</td>
                                    <td>{toDateTimeFormat(user.createdAt)}</td>

                                    <td>
                                        <Menu position="right-start">
                                            <Menu.Target>
                                                <IconDots className="text-blue-400 hover:text-blue-600" size={24} />
                                            </Menu.Target>
                                            <Menu.Dropdown miw={"200px"}>
                                                <Menu.Label>Thao tác</Menu.Label>
                                                <Menu.Item
                                                    color="yellow"
                                                    icon={<IconEdit size={24} />}
                                                    onClick={openUpdateModal}
                                                >
                                                    Sửa
                                                </Menu.Item>
                                                <Menu.Item color="red" icon={<IconTrash size={24} />}>
                                                    Xóa
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                <Flex justify={"center"}>
                    <Pagination total={totalPage} value={active} onChange={setPage} />
                </Flex>
            </Stack>
        </Stack>
    );
}
