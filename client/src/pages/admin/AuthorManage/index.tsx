import { useSearchAuthorQuery } from "@/gql/generated/graphql";
import { useAppSelector } from "@/redux/hook";
import { selectRole } from "@/redux/userSplice";
import { Button, Flex, Loader, Menu, Pagination, Stack, Table, TextInput, Title, Tooltip } from "@mantine/core";
import { useDebouncedState, useDisclosure, usePagination } from "@mantine/hooks";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useCallback } from "react";
import CreateAuthorModal from "./CreateAuthorModal";
import UpdateAuthorModal from "./UpdateAuthorModal";

export default function AuthorManagePage() {
    const { active, setPage } = usePagination({ total: 100, initialPage: 1 });
    const [search, setSearch] = useDebouncedState("", 1000);
    const [opened, { open, close }] = useDisclosure(false);
    const [openedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
    const [selectedAuthor, setSelectedAuthor] = React.useState<{
        _id: string;
        name: string;
        description: string;
    } | null>(null);
    const { data, loading, error, refetch } = useSearchAuthorQuery({
        variables: {
            page: active,
            limit: 20,
            keyword: search,
        },
    });
    const userRole = useAppSelector(selectRole);
    const totalPage = Math.ceil((data?.searchAuthor?.count || 20) / 20);
    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.currentTarget.value);
        },
        [setSearch]
    );
    React.useEffect(() => {
        refetch({
            keyword: search,
            page: active,
            limit: 20,
        });
    }, [active, data, refetch, search]);
    const onSaved = useCallback(() => {
        refetch({
            keyword: search,
            page: active,
            limit: 20,
        });
    }, [active, refetch, search]);
    return (
        <Stack className="p-2">
            <Flex>
                <Title order={2}>Quản lý tác giả</Title>
                <div className="ml-auto">
                    <Button size="md" color="teal" onClick={open}>
                        Tạo tác giả mới
                    </Button>
                    <CreateAuthorModal opened={opened} close={close} />
                </div>
            </Flex>
            <UpdateAuthorModal
                onSaved={onSaved}
                author={selectedAuthor}
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
                        label="Tìm kiếm tác giả"
                        placeholder="Theo tên"
                    />
                </Flex>
                <Title order={4} ml={"sm"}>
                    Danh sách tác giả
                </Title>

                <Table fontSize={"md"} striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Giới thiệu</th>
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
                            data?.searchAuthor?.authors?.map((author) => (
                                <tr
                                    key={author._id}
                                    onClick={() =>
                                        setSelectedAuthor({
                                            ...author,
                                            description: author.description || "",
                                        })
                                    }
                                >
                                    <td>{author.name}</td>
                                    <td>
                                        <Tooltip label={author.description || ""} position="bottom">
                                            <span>
                                                {author.description?.length || 0 > 40
                                                    ? author.description?.slice(0, 40) + "..."
                                                    : author.description}
                                            </span>
                                        </Tooltip>
                                    </td>
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
