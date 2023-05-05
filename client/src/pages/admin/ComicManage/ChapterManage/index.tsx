import FallBackLoader from "@/components/FallbackLoader";
import {
    Chapter,
    ChapterOrder,
    useGetAllChaptersAdminQuery,
    useGetComicByIdQuery,
    useUpdateChaptersOrderMutation,
} from "@/gql/generated/graphql";
import { getDiffStr } from "@/utils/dateUtils";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
    Button,
    Flex,
    ScrollArea,
    Space,
    Stack,
    Table,
    Text,
    TextInput,
    Title,
    createStyles,
    rem,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconDots, IconGripVertical } from "@tabler/icons-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function ChapterManage() {
    const { comicId } = useParams();
    const { data, loading, refetch } = useGetComicByIdQuery({ variables: { id: comicId! } });
    const { data: chapters, loading: chapterLoading } = useGetAllChaptersAdminQuery({
        variables: { comicId: comicId! },
    });
    const navigate = useNavigate();
    const { classes } = useStyles();
    const [state, handlers] = useListState<Chapter>();
    const [updateChapterOrder, { loading: updateLoading }] = useUpdateChaptersOrderMutation();

    React.useEffect(() => {
        if (comicId === undefined) {
            notifications.show({
                title: "Lỗi",
                message: "Không tìm thấy truyện",
                color: "red",
            });
            navigate("/admin/comic-manage");
        }
        if (loading) {
            return;
        }
        if (data?.comic === null) {
            notifications.show({
                title: "Lỗi",
                message: "Không tìm thấy truyện",
                color: "red",
            });
        }
    }, [comicId, data, loading, navigate]);
    React.useEffect(() => {
        if (chapters?.chapters) {
            handlers.setState(chapters.chapters as any);
        }
    }, [chapters]);
    if (chapterLoading) {
        return <FallBackLoader />;
    }
    const onSaveOrder = () => {
        modals.openConfirmModal({
            title: "Thay đổi thứ tự chương",
            centered: true,
            children: (
                <Text size="sm">
                    Bạn có chắc chắn muốn thay đổi thứ tự chương? Thứ tự chương sẽ được lưu lại và không thể khôi phục
                </Text>
            ),
            labels: { confirm: "Lưu", cancel: "Hủy" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                const length = state.length;
                const chapterOrderInput: ChapterOrder[] = state.map((c, index) => ({
                    id: c._id,
                    order: length - index,
                }));
                console.log(chapters);
                updateChapterOrder({
                    variables: {
                        input: {
                            chapters: chapterOrderInput,
                        },
                    },
                }).then((res) => {
                    refetch();
                    notifications.show({
                        title: "ok",
                        color: "green",
                        message: "ok",
                    });
                });

                console.log(chapterOrderInput);
            },
        });
    };

    const items = state.map((item, index) => (
        <Draggable key={item._id} index={index} draggableId={item._id}>
            {(provided) => (
                <tr className={classes.item} ref={provided.innerRef} {...provided.draggableProps}>
                    <td>
                        <div className={classes.dragHandle} {...provided.dragHandleProps}>
                            <IconGripVertical size="1.05rem" stroke={1.5} />
                        </div>
                    </td>
                    <td>{item.order}</td>
                    <td>{item.chapterNumber}</td>
                    <td>{item.name}</td>
                    <td>4200</td>
                    <td>{item.pageCount}</td>
                    <td>{getDiffStr(item.updatedAt)}</td>
                    <td>
                        <IconDots cursor={"pointer"} />
                    </td>
                </tr>
            )}
        </Draggable>
    ));
    return (
        <Stack p={"lg"}>
            <Flex justify={"space-between"}>
                <Link to={`/admin/comic-manage/edit/${comicId}`}>
                    <Title order={2}>{data?.comic?.name}</Title>
                </Link>
                <Link to={`/admin/chapter-manage/create/${comicId}`} className="ml-auto">
                    <Button size="md">Tạo chương mới</Button>
                </Link>
            </Flex>
            <Stack>
                <Flex justify={"center"}>
                    <TextInput
                        className="grow shrink"
                        maw={500}
                        label="Tìm kiếm chương"
                        placeholder="Theo tên,số chương"
                    />
                </Flex>
                <Flex align={"center"} justify={"space-between"}>
                    <Title order={4} ml={"sm"}>
                        Danh sách chương
                    </Title>
                    <Button mr={"lg"} onClick={onSaveOrder}>
                        Lưu thứ tự
                    </Button>
                </Flex>
                <ScrollArea h={"100vh"}>
                    <DragDropContext
                        onDragEnd={({ destination, source }) =>
                            handlers.reorder({ from: source.index, to: destination?.index || 0 })
                        }
                    >
                        <Table fontSize={"md"} striped highlightOnHover withBorder withColumnBorders>
                            <thead>
                                <tr>
                                    <th style={{ width: rem(40) }} />
                                    <th>
                                        <Text size={"md"} p={"sm"}>
                                            Order
                                        </Text>
                                    </th>
                                    <th>
                                        <Text size={"md"} p={"sm"}>
                                            Số chương
                                        </Text>
                                    </th>
                                    <th>
                                        <Text size={"md"} p={"sm"}>
                                            Tên chương
                                        </Text>
                                    </th>
                                    <th>
                                        <Text size={"md"} p={"sm"}>
                                            Lượt xem
                                        </Text>
                                    </th>
                                    <th>
                                        <Text size={"md"} p={"sm"}>
                                            Số trang
                                        </Text>
                                    </th>
                                    <th>
                                        <Text size={"md"} p={"sm"}>
                                            Cập nhật lúc{" "}
                                        </Text>
                                    </th>
                                    <th>
                                        <Space w={"20px"}></Space>
                                    </th>
                                </tr>
                            </thead>
                            <Droppable droppableId="dnd-list" direction="vertical">
                                {(provided) => (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                        {items}
                                        {provided.placeholder}
                                    </tbody>
                                )}
                            </Droppable>
                        </Table>
                    </DragDropContext>
                </ScrollArea>
            </Stack>
        </Stack>
    );
}

const useStyles = createStyles((theme) => ({
    item: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    dragHandle: {
        ...theme.fn.focusStyles(),
        width: rem(40),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[6],
    },
}));

interface DndTableProps {
    data: {
        position: number;
        mass: number;
        symbol: string;
        name: string;
    }[];
}
