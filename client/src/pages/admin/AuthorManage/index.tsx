import { useSearchAuthorQuery } from "@/gql/generated/graphql";
import { toDateTimeFormat } from "@/utils/dateUtils";
import { Button, Flex, Loader, Pagination, Stack, Table, TextInput, Title } from "@mantine/core";
import { useDebouncedState, useDisclosure, usePagination } from "@mantine/hooks";
import React, { useCallback } from "react";
import CreateAuthorModal from "./CreateAuthorModal";

export default function AuthorManagePage() {
    const { active, setPage } = usePagination({ total: 100, initialPage: 1 });
    const [search, setSearch] = useDebouncedState("", 1000);
    const [opened, { open, close }] = useDisclosure(false);
    const { data, loading, error, refetch } = useSearchAuthorQuery({
        variables: {
            page: active,
            limit: 20,
            keyword: search,
        },
    });
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
                            <th>Slug</th>
                            <th>Giới thiệu</th>
                            <th>Ngày tạo </th>
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
                                <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>{author.slug}</td>
                                    <td>{author.description}</td>
                                    <td>{toDateTimeFormat(author.createdAt)}</td>
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
