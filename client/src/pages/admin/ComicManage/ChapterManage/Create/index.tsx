import { useCreateChapterMutation, useGetComicByIdQuery } from "@/gql/generated/graphql";
import { getImageUrl, uploadImages } from "@/utils/imageUtils";
import {
    Box,
    Button,
    Container,
    Flex,
    Group,
    Image,
    Stack,
    Table,
    Text,
    TextInput,
    Title,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
export default function CreateChapter() {
    const { comicId } = useParams<{ comicId: string }>();
    const [loading, setLoading] = React.useState(false);
    const { data: dataComic } = useGetComicByIdQuery({
        variables: {
            id: comicId || "a",
        },
    });
    const { errors, onSubmit: onFormSubmit, values, setFieldValue } = useCreateChapterForm();

    const [files, setFiles] = React.useState<FileWithPath[]>([]);
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const [createChapterMutation, { data: createdData, loading: createLoading, error: createdError }] =
        useCreateChapterMutation();
    if (!comicId) return <Navigate to="/admin/comic-manage" replace={true} />;

    const onDrop = (files: FileWithPath[]) => {
        setFiles(files);
    };
    const onSubmit = async (value: IFormValues) => {
        if (files.length === 0) {
            notifications.show({
                title: "Lỗi",
                message: "Bạn chưa chọn ảnh",
                color: "red",
            });
            return;
        }
        setLoading(true);
        // todo: upload images
        const newFileName = await uploadImages(files);
        const pages = newFileName.map((item, index) => {
            return {
                url: item.url,
                order: index + 1,
            };
        });
        console.log({
            chapterNumber: value.chapterNumber + "",
            comicId: comicId,
            pages: pages,
            name: value.name,
        });
        const res = await createChapterMutation({
            variables: {
                input: {
                    chapterNumber: value.chapterNumber + "",
                    comicId: comicId,
                    pages: pages,
                    name: value.name,
                },
            },
        });
        setLoading(false);

        // todo: create chapter
        notifications.show({
            title: "Thành công",
            message: "Tạo chương mới thành công",
            color: "green",
        });
        navigate(`/admin/comic-manage/edit/chapters/${comicId}`);
    };

    return (
        <Box p={"sm"}>
            <Link to={`/admin/comic-manage/edit/${comicId}`}>
                <Title order={2}>{dataComic?.comic?.name}</Title>
            </Link>
            <Container>
                <Flex mt={"lg"}>
                    <Flex direction={"column"} className="w-1/3">
                        <div className="h-10"></div>
                        {dataComic?.comic?.imageCoverUrl && (
                            <Image src={getImageUrl(dataComic?.comic?.imageCoverUrl)} height={300} width={200} />
                        )}
                    </Flex>
                    <Flex direction={"column"} className="grow">
                        <Title order={2}>Thêm chương mới</Title>
                        <form className="gap grow shrink" onSubmit={onFormSubmit(onSubmit)}>
                            <Stack spacing={"lg"}>
                                <TextInput
                                    required
                                    label="Tên chương"
                                    placeholder="Tên chương"
                                    value={values.name}
                                    onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                                    radius={"md"}
                                />
                                <TextInput
                                    required
                                    label="Số chương"
                                    placeholder="Số chương"
                                    value={values.chapterNumber}
                                    type="number"
                                    onChange={(e) => setFieldValue("chapterNumber", Number(e.currentTarget.value))}
                                    radius={"md"}
                                />
                                <Stack>
                                    <Text size="sm" inline>
                                        Các trang trong chương
                                    </Text>
                                    <Dropzone
                                        onDrop={onDrop}
                                        onReject={(files) => console.log("rejected files", files)}
                                        maxSize={3 * 1024 ** 2}
                                        accept={IMAGE_MIME_TYPE}
                                    >
                                        <Group
                                            position="center"
                                            spacing="xl"
                                            style={{ minHeight: rem(80), pointerEvents: "none" }}
                                        >
                                            <Dropzone.Accept>
                                                <IconUpload
                                                    size="3.2rem"
                                                    stroke={1.5}
                                                    color={
                                                        theme.colors[theme.primaryColor][
                                                            theme.colorScheme === "dark" ? 4 : 6
                                                        ]
                                                    }
                                                />
                                            </Dropzone.Accept>
                                            <Dropzone.Reject>
                                                <IconX
                                                    size="3.2rem"
                                                    stroke={1.5}
                                                    color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                                                />
                                            </Dropzone.Reject>
                                            <Dropzone.Idle>
                                                <IconPhoto size="3.2rem" stroke={1.5} />
                                            </Dropzone.Idle>

                                            <div>
                                                <Text size="xl" inline>
                                                    Kéo thả các ảnh vào đây hoặc click để chọn
                                                </Text>
                                                <Text size="sm" color="dimmed" inline mt={7}>
                                                    Lưu ý: Ảnh sẽ được sắp xếp theo thứ tự chọn của bạn
                                                </Text>
                                            </div>
                                        </Group>
                                    </Dropzone>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>STT trang</th>
                                                <th>Tên file ảnh</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {files.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{file.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Stack>

                                <Button type="submit" color="teal" variant="outline" radius="md" loading={loading}>
                                    Thêm chương
                                </Button>
                            </Stack>
                        </form>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
}

function useCreateChapterForm(
    initialValues = {
        name: "",
        chapterNumber: 0,
    }
) {
    const form = useForm<IFormValues>({
        initialValues,
    });
    return form;
}

interface IFormValues {
    name: string;
    chapterNumber: number;
}
