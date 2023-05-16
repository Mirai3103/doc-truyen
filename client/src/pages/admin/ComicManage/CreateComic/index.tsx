import DragDropImage from "@/components/DragDropImage";
import TextEditor from "@/components/TextEditor";
import { CreateComicInput, useCreateComicMutation, useGetGeneralInfoQuery } from "@/gql/generated/graphql";
import { uploadImage } from "@/utils/imageUtils";
import { Button, Flex, MultiSelect, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import React from "react";
import { useCreateComicForm } from "./useCreateComicForm";

export default function CreateComicPage() {
    const [createComicMutation, { data: createdData, loading: createLoading, error: createdError }] =
        useCreateComicMutation();
    const { setFieldValue, values: formValues, onSubmit: onFormSubmit } = useCreateComicForm();
    const { data } = useGetGeneralInfoQuery();
    const onSubmit = async (values: any) => {
        if (formValues.avatarBlob === null) {
            notifications.show({
                title: "Lỗi",
                message: "Bạn chưa chọn ảnh avatar",
                color: "red",
            });
            return;
        }
        if (formValues.thumbBlob === null) {
            notifications.show({
                title: "Lỗi",
                message: "Bạn chưa chọn ảnh bìa",
                color: "red",
            });
            return;
        }
        const imageCoverUrl = uploadImage(formValues.avatarBlob!);
        const imageThumbUrl = uploadImage(formValues.thumbBlob!);

        const res = await Promise.all([imageCoverUrl, imageThumbUrl]);
        const newComic: CreateComicInput = {
            authorId: formValues.authorId,
            categoryId: formValues.categoryId,
            genreIds: formValues.genreIds,
            imageCoverUrl: res[0],
            imageThumbUrl: res[1],
            name: formValues.name,
            status: formValues.status,
            artistId: formValues.artistId,
            description: formValues.description,
            officeUrl: formValues.officeUrl,
            otherNames: formValues.otherNames,
        };
        createComicMutation({ variables: { input: newComic } });
    };

    const onFileAvatarChange = React.useCallback(
        (e: Blob | null) => {
            setFieldValue("avatarBlob", e);
        },
        [setFieldValue]
    );
    const onFileThumbChange = React.useCallback(
        (e: Blob | null) => {
            setFieldValue("thumbBlob", e);
        },
        [setFieldValue]
    );
    const onDescriptionChange = React.useCallback(
        (e: string) => {
            setFieldValue("description", e);
        },
        [setFieldValue]
    );

    React.useEffect(() => {
        if (createdData) {
            notifications.show({
                title: "Tạo truyện thành công",
                message: "Truyện mới đã được tạo thành công",
                color: "teal",
                icon: <IconCircleCheckFilled />,
            });
        }
    }, [createdData]);
    return (
        <div className="p-2">
            <Title order={2} mb={"2rem"}>
                Đăng truyện mới
            </Title>
            <Flex gap={80} mx={"auto"} w="50rem">
                <Stack spacing={"xs"} className="grow-0">
                    <Flex gap={"xs"}>
                        <Text size="xl" inline>
                            Ảnh avatar
                        </Text>
                        <Text size="sm" color="red" inline>
                            {" *"}
                        </Text>
                    </Flex>
                    <DragDropImage
                        onChange={onFileAvatarChange}
                        withCrop
                        title="Tải lên avatar"
                        description="Nhấn vào đây hoặc kéo thả ảnh avatar"
                        value={formValues.avatarBlob}
                    />
                </Stack>
                <form className="gap grow shrink" onSubmit={onFormSubmit((values) => onSubmit(values))}>
                    <Stack spacing={"lg"}>
                        <TextInput
                            required
                            label="Tên truyện"
                            placeholder="Tên truyện"
                            value={formValues.name}
                            onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                            radius={"md"}
                        />

                        <TextInput
                            label="Tên khác (cách nhau bởi dấu chấm phẩy)"
                            placeholder="Tên khác (cách nhau bởi dấu chấm phẩy)"
                            value={formValues.otherNames?.join(";")}
                            onChange={(e) => setFieldValue("otherNames", e.currentTarget.value.split(";"))}
                            radius={"md"}
                        />
                        <TextInput
                            label="Trang web chính thức"
                            placeholder="Trang web chính thức"
                            value={formValues.officeUrl || ""}
                            onChange={(e) => setFieldValue("officeUrl", e.currentTarget.value)}
                            radius={"md"}
                        />
                        <Select
                            required
                            label="Xuất xứ"
                            placeholder="Xuất xứ truyện"
                            data={
                                data?.categories.map((category) => ({
                                    label: category.name,
                                    value: category._id,
                                })) ?? []
                            }
                            value={formValues.categoryId}
                            onChange={(e) => setFieldValue("categoryId", e!)}
                            searchable
                        />
                        <MultiSelect
                            required
                            data={data?.genres.map((tag) => ({ label: tag.name, value: tag._id })) ?? []}
                            label="Thể loại"
                            placeholder="Chọn thể loại"
                            value={formValues.genreIds}
                            onChange={(e) => setFieldValue("genreIds", e || [])}
                            searchable
                            clearable
                        />
                        <Select
                            required
                            label="Tác giả"
                            placeholder="Tác giả"
                            data={data?.authors.map((author) => ({ label: author.name, value: author._id })) ?? []}
                            value={formValues.authorId}
                            onChange={(e) => setFieldValue("authorId", e!)}
                            searchable
                        />
                        <Stack spacing={"xs"} className="grow-0 mx-auto">
                            <Flex gap={"xs"}>
                                <Text size="md  " inline>
                                    Ảnh bìa
                                </Text>
                                <Text size="sm" color="red" inline>
                                    {" *"}
                                </Text>
                            </Flex>
                            <DragDropImage
                                w="520px"
                                h="292px"
                                aspect={16 / 9}
                                withCrop
                                title="Tải lên ảnh bìa"
                                description="Nhấn vào đây hoặc kéo thả ảnh bìa"
                                onChange={onFileThumbChange}
                                value={formValues.thumbBlob}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Text size={"sm"}>Mô tả: </Text>
                            <TextEditor value={formValues.description} onChange={onDescriptionChange}></TextEditor>
                        </Stack>
                        <Button
                            type="submit"
                            color="teal"
                            variant="outline"
                            radius="md"
                            disabled={createLoading}
                            loading={createLoading}
                        >
                            Đăng truyện
                        </Button>
                    </Stack>
                </form>
            </Flex>
        </div>
    );
}
