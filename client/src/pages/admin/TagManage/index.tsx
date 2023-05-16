import { useFindAllTagQuery } from "@/gql/generated/graphql";
import { useAppSelector } from "@/redux/hook";
import { selectRole } from "@/redux/userSplice";
import { Button, Flex, Loader, Menu, Stack, Table, TextInput, Title, Tooltip } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useCallback } from "react";
import CreateTagModal from "./CreateTagModal";
import UpdateTagModal from "./UpdateTagModal";

export default function TagManagePage() {
    const [search, setSearch] = useDebouncedState("", 1000);
    const [opened, { open, close }] = useDisclosure(false);
    const [openedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);

    const [selectedTag, setSelectedTag] = React.useState<{
        _id: string;
        name: string;
        description: string;
    } | null>(null);
    const { data, loading, error, refetch } = useFindAllTagQuery({});
    const userRole = useAppSelector(selectRole);
    const filterData = React.useMemo(() => {
        if (!data) return [];
        return data.tags.filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()));
    }, [data, search]);

    const onSaved = useCallback(() => {
        refetch();
    }, [refetch]);
    return (
        <Stack className="p-2">
            <Flex>
                <Title order={2}>Quản lý tag</Title>
                <div className="ml-auto">
                    <Button size="md" color="teal" onClick={open}>
                        Tạo tag mới
                    </Button>
                    <CreateTagModal opened={opened} close={close} />
                </div>
            </Flex>
            <UpdateTagModal onSaved={onSaved} tag={selectedTag} opened={openedUpdateModal} close={closeUpdateModal} />

            <Stack spacing={"lg"}>
                <Flex justify={"center"}>
                    <TextInput
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        defaultValue={search}
                        className="grow shrink"
                        maw={500}
                        label="Tìm kiếm tag"
                        placeholder="Theo tên"
                    />
                </Flex>
                <Title order={4} ml={"sm"}>
                    Danh sách tag
                </Title>

                <Table fontSize={"md"} striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <td>Loại</td>
                            <th>Slug</th>
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
                            filterData.map((tag) => (
                                <tr
                                    key={tag._id}
                                    onClick={() =>
                                        setSelectedTag({
                                            ...tag,
                                            description: tag.description || "",
                                        })
                                    }
                                >
                                    <td>{tag.name}</td>
                                    <td>{tag.type}</td>
                                    <td>{tag.slug}</td>
                                    <td>
                                        <Tooltip label={tag.description || ""} position="bottom">
                                            <span>
                                                {tag.description?.length || 0 > 40
                                                    ? tag.description?.slice(0, 40) + "..."
                                                    : tag.description}
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
            </Stack>
        </Stack>
    );
}
