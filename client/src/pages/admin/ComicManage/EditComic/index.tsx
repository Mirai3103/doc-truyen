import DragDropImage from "@/components/DragDropImage";
import TextEditor from "@/components/TextEditor";
import {
    CreateComicInput,
    useDeleteComicMutation,
    useGetComicByIdQuery,
    useGetGeneralInfoQuery,
    useUpdateComicMutation,
} from "@/gql/generated/graphql";
import { useAppSelector } from "@/redux/hook";
import { Role, selectUserProfile } from "@/redux/userSplice";
import { getBlob, getImageUrl, uploadImage } from "@/utils/imageUtils";
import { Button, Flex, MultiSelect, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useCreateComicForm } from "../CreateComic/useCreateComicForm";
export enum Status {
    Paused = "Tạm dừng",
    Completed = "Hoàn thành",
    Ongoing = "Đang tiến hành",
    Drop = "Drop",
    NonPublished = "Chưa xuất bản",
}
const statusOptions: {
    label: string;
    value: string;
}[] = Object.values(Status).map((status) => ({
    label: status,
    value: status,
}));
export default function EditComicPage() {
    const { comicId } = useParams<{ comicId: string }>();
    const [isChangedAvatar, setIsChangedAvatar] = React.useState(false);
    const [isChangedThumb, setIsChangedThumb] = React.useState(false);
    const userProfile = useAppSelector(selectUserProfile);
    const [updateComicMutation, { data: updatedData, loading: updatedLoading, error: updatedError }] =
        useUpdateComicMutation();
    const navigate = useNavigate();
    const [deleteComicMutation] = useDeleteComicMutation();
    const { data: dataComic } = useGetComicByIdQuery({
        variables: {
            id: comicId!,
        },
        fetchPolicy: "no-cache",
    });
    const { setFieldValue, values: formValues, onSubmit: onFormSubmit } = useCreateComicForm();
    const { data } = useGetGeneralInfoQuery();
    const onSubmit = async (values: any) => {
        let imageCoverUrl, imageThumbUrl: string | undefined;
        if (isChangedAvatar) {
            if (formValues.avatarBlob === null) {
                notifications.show({
                    title: "Lỗi",
                    message: "Bạn chưa chọn ảnh avatar",
                    color: "red",
                });
                return;
            }

            imageCoverUrl = await uploadImage(formValues.avatarBlob!);
        }
        if (isChangedThumb) {
            if (formValues.thumbBlob === null) {
                notifications.show({
                    title: "Lỗi",
                    message: "Bạn chưa chọn ảnh bìa",
                    color: "red",
                });
                return;
            }
            imageThumbUrl = await uploadImage(formValues.thumbBlob!);
        }

        const newComic: CreateComicInput = {
            authorId: formValues.authorId,
            categoryId: formValues.categoryId,
            genreIds: formValues.genreIds,
            imageCoverUrl: imageCoverUrl || dataComic?.comic?.imageCoverUrl,
            imageThumbUrl: imageThumbUrl || dataComic?.comic?.imageThumbUrl!,
            name: formValues.name,
            status: formValues.status,
            artistId: formValues.artistId,
            description: formValues.description,
            officeUrl: formValues.officeUrl,
            otherNames: formValues.otherNames,
        };
        console.log(newComic);
        updateComicMutation({
            variables: {
                id: comicId!,
                input: newComic,
            },
        });
    };

    const onFileAvatarChange = React.useCallback(
        (e: Blob | null) => {
            setFieldValue("avatarBlob", e);
            setIsChangedAvatar(true);
        },
        [setFieldValue]
    );
    const onFileThumbChange = React.useCallback(
        (e: Blob | null) => {
            setFieldValue("thumbBlob", e);
            setIsChangedAvatar(true);
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
        if (dataComic?.comic) {
            setFieldValue("name", dataComic.comic.name);
            setFieldValue("otherNames", dataComic.comic.otherNames);
            setFieldValue("officeUrl", dataComic.comic.officeUrl || "");
            setFieldValue("categoryId", dataComic.comic.category!._id);
            setFieldValue(
                "genreIds",
                dataComic.comic.genres.map((genre) => genre._id)
            );
            setFieldValue("status", dataComic.comic.status);
            setFieldValue("description", dataComic.comic.description);
            setFieldValue("authorId", dataComic.comic.author._id);
            setFieldValue("artistId", dataComic.comic.artist?._id);
            getBlob(getImageUrl(dataComic.comic.imageCoverUrl)).then((blob) => {
                setFieldValue("avatarBlob", blob);
            });
            getBlob(getImageUrl(dataComic.comic.imageThumbUrl)).then((blob) => {
                setFieldValue("thumbBlob", blob);
            });
        }
    }, [dataComic, dataComic?.comic, setFieldValue]);
    React.useEffect(() => {
        if (dataComic && userProfile) {
            if (dataComic?.comic.createdBy._id !== userProfile?._id && userProfile?.role !== Role.ADMIN) {
                notifications.show({
                    title: "Lỗi",
                    message: "Bạn không có quyền chỉnh sửa truyện này",
                    color: "red",
                });
                navigate("/admin/comic-manage/");
            }
        }
    }, [dataComic, navigate, userProfile]);
    React.useEffect(() => {
        if (updatedData) {
            notifications.show({
                title: "Thành công",
                message: "Cập nhật truyện thành công",
                color: "green",
            });
            navigate(`/admin/comic-manage`);
        }
    }, [navigate, updatedData]);
    if (!comicId) {
        notifications.show({
            title: "Lỗi",
            message: "Không tìm thấy truyện",
            color: "red",
        });
        return <Navigate to="/admin/comic-manage/" />;
    }
    const onDeleteComic = async () => {
        modals.openConfirmModal({
            title: "Bạn có chắc muốn xóa truyện này?",
            children: (
                <Text size="sm">
                    Truyện sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn muốn xóa truyện này?
                </Text>
            ),
            labels: { confirm: "Xóa", cancel: "Hủy" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                deleteComicMutation({
                    variables: {
                        id: comicId,
                    },
                });
                navigate("/admin/comic-manage");
                notifications.show({
                    title: "Thành công",
                    message: "Xóa truyện thành công",
                    color: "green",
                });
            },
        });
    };
    return (
        <div className="p-2">
            <Flex justify={"space-between"}>
                <Title order={2} mb={"2rem"}>
                    Đăng truyện mới
                </Title>
                <Link to={`/admin/comic-manage/edit/chapters/${comicId}`}>
                    <Button size="md" color="teal">
                        Quản lý chương
                    </Button>
                </Link>
            </Flex>
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
                            label="Tình trạng"
                            placeholder="Tình trạng truyện"
                            data={statusOptions}
                            value={formValues.status}
                            onChange={(e) => setFieldValue("status", e!)}
                            searchable
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
                        <Button type="submit" color="teal" variant="outline" radius="md">
                            Lưu
                        </Button>
                        <div className="flex font-bold justify-end pt-10">
                            <Button leftIcon={<IconTrash />} color="red" onClick={onDeleteComic}>
                                Xóa
                            </Button>
                        </div>
                    </Stack>
                </form>
            </Flex>
        </div>
    );
}
