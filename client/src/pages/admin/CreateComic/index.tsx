import DragDropImage from "@/components/DragDropImage";
import TextEditor from "@/components/TextEditor";
import { useGetGeneralInfoQuery } from "@/gql/generated/graphql";
import { Button, Flex, MultiSelect, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { useCreateComicForm } from "./useCreateComicForm";

enum Category {
    Manga = "manga",
    Manhua = "manhua",
    Manhwa = "manhwa",
    Comic = "comic",
}
const categoryOptions = [
    { label: "Manga", value: Category.Manga },
    { label: "Manhua", value: Category.Manhua },
    { label: "Manhwa", value: Category.Manhwa },
    { label: "Comic", value: Category.Comic },
];
//{/* <TextEditor />; */}

export default function CreateComicPage() {
    // const [createComicMutation, { data, loading, error }] = useCreateComicMutation();
    const form = useCreateComicForm();
    const { data, loading, error } = useGetGeneralInfoQuery();

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
                        onChange={(e) => {
                            form.setFieldValue("avatarBlob", e);
                        }}
                        withCrop
                        title="Tải lên avatar"
                        description="Nhấn vào đây hoặc kéo thả ảnh avatar"
                    />
                </Stack>
                <form className="gap grow shrink" onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack spacing={"lg"}>
                        <TextInput
                            required
                            label="Tên truyện"
                            placeholder="Tên truyện"
                            value={form.values.name}
                            onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
                            radius={"md"}
                        />

                        <TextInput
                            label="Tên khác (cách nhau bởi dấu chấm phẩy)"
                            placeholder="Tên khác (cách nhau bởi dấu chấm phẩy)"
                            value={form.values.otherNames?.join(";")}
                            onChange={(e) => form.setFieldValue("otherNames", e.currentTarget.value.split(";"))}
                            radius={"md"}
                        />
                        <TextInput
                            label="Trang web chính thức"
                            placeholder="Trang web chính thức"
                            value={form.values.officeUrl || ""}
                            onChange={(e) => form.setFieldValue("officeUrl", e.currentTarget.value)}
                            radius={"md"}
                        />
                        <Select
                            required
                            label="Xuất xứ"
                            placeholder="Xuất xứ truyện"
                            data={categoryOptions}
                            value={form.values.categoryId}
                            onChange={(e) => form.setFieldValue("categoryId", e!)}
                            searchable
                        />
                        <MultiSelect
                            required
                            data={data?.tags.map((tag) => ({ label: tag.name, value: tag._id })) ?? []}
                            label="Thể loại"
                            placeholder="Chọn thể loại"
                            value={form.values.genreIds}
                            onChange={(e) => form.setFieldValue("genreIds", e || [])}
                            searchable
                            clearable
                        />
                        <Select
                            required
                            label="Tác giả"
                            placeholder="Tác giả"
                            data={data?.authors.map((author) => ({ label: author.name, value: author._id })) ?? []}
                            value={form.values.authorId}
                            onChange={(e) => form.setFieldValue("authorId", e!)}
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
                                onChange={(e) => {
                                    form.setFieldValue("thumbBlob", e);
                                }}
                            />
                        </Stack>
                        <Stack spacing={1}>
                            <Text size={"sm"}>Mô tả: </Text>
                            <TextEditor onChange={(value) => form.setFieldValue("description", value)}></TextEditor>
                        </Stack>
                        <Button type="submit" color="teal" variant="outline" radius="md">
                            Đăng truyện
                        </Button>
                    </Stack>
                </form>
            </Flex>
        </div>
    );
}
