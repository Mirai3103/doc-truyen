import { useGetComicByIdQuery, useGetLastedChapterByComicIdQuery } from "@/gql/generated/graphql";
import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";

export default function CreateChapter() {
    const { comicId } = useParams<{ comicId: string }>();

    const {
        data: dataComic,
        loading,
        error,
    } = useGetComicByIdQuery({
        variables: {
            id: comicId || "a",
        },
    });

    if (!comicId) return <Navigate to="/admin/comic-manage" replace={true} />;
    return (
        <Box p={"sm"}>
            <Link to={`/admin/comic-manage/edit/${comicId}`}>
                <Title order={2}>{dataComic?.comic?.name}</Title>
            </Link>
            <Flex justify={"center"} direction={"column"} align={"center"}>
                <Title order={2}>Thêm chương mới</Title>
            </Flex>
        </Box>
    );
}
