import { withAuth } from "@/HOC/authGuard";
import {
    useGetAllHistoriesQuery,
    useRemoveAllHistoryMutation,
    useRemoveHistoryMutation,
} from "@/gql/generated/graphql";
import { useAppSelector } from "@/redux/hook";
import { selectUserProfile } from "@/redux/userSplice";
import { toDateTimeFormat } from "@/utils/dateUtils";
import { getImageUrl } from "@/utils/imageUtils";
import { Button, Flex, Group, Image, Stack, Table, Text, Title, Tooltip } from "@mantine/core";
import { IconTrash, IconX } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function ReadingHistory() {
    const userProfile = useAppSelector(selectUserProfile);
    const { data, refetch } = useGetAllHistoriesQuery({
        variables: {
            userId: userProfile?._id || "",
        },
    });
    const [removeHistory, { data: removeData }] = useRemoveHistoryMutation();
    const [removeAllHistory, { data: removeAllData }] = useRemoveAllHistoryMutation();
    React.useEffect(() => {
        refetch();
    }, [refetch, removeData, removeAllData]);
    const sortedData = React.useMemo(() => {
        if (!data?.histories) return [];
        return [...data.histories].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [data?.histories]);
    const navigate = useNavigate();
    return (
        <Stack m={"lg"}>
            <Title>Lịch sử đọc</Title>
            <Group position={"left"}>
                <Button
                    className="px-10"
                    size="md"
                    leftIcon={<IconX />}
                    onClick={() => {
                        removeAllHistory();
                    }}
                >
                    Xóa tất cả
                </Button>
            </Group>
            <Table fontSize={"md"} withBorder withColumnBorders highlightOnHover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Truyện</th>
                        <th>Chương đọc gần nhất</th>
                        <th>Thời gian</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.histories?.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Lịch sử đọc trống
                            </td>
                        </tr>
                    )}
                    {sortedData.map((history, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Flex align={"center"} gap={"md"}>
                                    <Image width={100} src={getImageUrl(history.chapter?.comic.imageCoverUrl || "")} />
                                    <Flex direction={"column"} justify={"center"}>
                                        <Text
                                            size={"sm"}
                                            className="hover:underline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/comic/${history.chapter?.comic.slug}`);
                                            }}
                                        >
                                            {history.chapter?.comic.name}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </td>
                            <td>
                                <Tooltip
                                    label={`Chương ${history.chapter?.chapterNumber} - ${history.chapter?.name || ""}`}
                                >
                                    <span>
                                        {`Chương ${history.chapter?.chapterNumber} - ${history.chapter?.name || ""}`
                                            .length > 20
                                            ? `Chương ${history.chapter?.chapterNumber} - ${
                                                  history.chapter?.name || ""
                                              }`.slice(0, 40) + "..."
                                            : `Chương ${history.chapter?.chapterNumber} - ${
                                                  history.chapter?.name || ""
                                              }`}
                                    </span>
                                </Tooltip>
                            </td>
                            <td>{toDateTimeFormat(history.createdAt)}</td>
                            <td>
                                <Button
                                    color="red"
                                    variant="outline"
                                    leftIcon={<IconTrash />}
                                    onClick={() => {
                                        removeHistory({
                                            variables: {
                                                chapterId: history.chapter?._id || "",
                                            },
                                        });
                                    }}
                                >
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Stack>
    );
}

const ReadingHistoryPage = withAuth(ReadingHistory);
export default ReadingHistoryPage;
