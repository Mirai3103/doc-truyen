import { withAuth } from "@/HOC/authGuard";
import DragDropImageMemo from "@/components/DragDropImage";
import TextEditor from "@/components/TextEditor";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/gql/generated/graphql";
import { useAppSelector } from "@/redux/hook";
import { Role, roleToString, selectUserProfile } from "@/redux/userSplice";
import { blobToBase64, getBlob } from "@/utils/imageUtils";
import { Button, Container, Flex, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { UpdateModal } from "./ImportantFieldsUpdate";

function ProfilePage() {
    const userProfile = useAppSelector(selectUserProfile);
    const [opened, { close, open }] = useDisclosure();
    const [avatar, setAvatar] = useState<Blob | null>(null);
    const [type, setType] = useState<"email" | "password">("email");
    const { data, loading, error } = useGetUserByIdQuery({
        variables: {
            input: {
                _id: userProfile?._id,
            },
        },
    });
    const [updateUserMutatiom, { loading: updateLoading }] = useUpdateUserMutation();
    const { values, setFieldValue, onSubmit } = useForm<IProfileUpdateDTO>({
        initialValues: {
            username: userProfile?.username || "",
            description: "",
            displayName: userProfile?.displayName || "",
        },
    });

    const onAvatarChange = React.useCallback(
        async (blob: Blob | null) => {
            setAvatar(blob);
            if (blob) {
                setFieldValue("base64Avatar", await blobToBase64(blob));
            } else setFieldValue("base64Avatar", "");
        },
        [setFieldValue]
    );
    const onSubmitForm = async (values: IProfileUpdateDTO) => {
        await updateUserMutatiom({
            variables: {
                id: userProfile?._id || "",
                updateUserInput: {
                    displayName: values.displayName,
                    description: values.description,
                    username: values.username,
                    base64Avatar: values.base64Avatar,
                },
            },
        });
        notifications.show({
            message: "Cập nhật thành công",
            color: "green",
            title: "Thành công",
        });
    };
    React.useEffect(() => {
        if (userProfile?.avatarUrl) {
            getBlob(userProfile.avatarUrl).then((blob) => {
                setAvatar(blob);
            });
        }
    }, [userProfile]);
    React.useEffect(() => {
        setFieldValue("description", data?.user.description || "");
    }, [data, setFieldValue]);

    return (
        <Flex align={"center"} mt={"lg"} direction={"column"}>
            <Flex gap={"lg"} direction={"column"} align={"center"}>
                <DragDropImageMemo
                    onChange={onAvatarChange}
                    description="Kéo thả ảnh vào đây"
                    title="Avatar"
                    value={avatar}
                    aspect={1}
                    h="200px"
                    w="200px"
                    withCrop
                />
                <Title order={2}>{userProfile?.displayName}</Title>
            </Flex>
            <Flex w={"100%"} direction={"column"}>
                <Container>
                    <Title my={"sm"} ml={"-60px"} order={3}>
                        Thông tin cá nhân
                    </Title>
                    <form onSubmit={onSubmit(onSubmitForm)}>
                        <Stack>
                            <TextInput
                                value={values.username}
                                onChange={(e) => setFieldValue("username", e.currentTarget.value)}
                                label="Tên đăng nhập"
                                required
                            />
                            <TextInput
                                value={values.displayName}
                                onChange={(e) => setFieldValue("displayName", e.currentTarget.value)}
                                label="Tên hiển thị"
                                required
                            />
                            <TextInput value={roleToString(userProfile?.role || Role.USER)} label="Quyền" readOnly />
                            <Stack>
                                <Title order={5}>Mô tả</Title>
                                <TextEditor
                                    value={values.description}
                                    onChange={(e) => setFieldValue("description", e)}
                                />
                            </Stack>
                        </Stack>
                        <Stack w={"100%"}>
                            <Button
                                mt={"lg"}
                                mx={"auto"}
                                w={"80%"}
                                type="submit"
                                variant="filled"
                                disabled={updateLoading}
                            >
                                Cập nhật
                            </Button>
                            <Group position="right">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setType("password");
                                        open();
                                    }}
                                    variant="outline"
                                    color="red"
                                >
                                    Đổi mật khẩu
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setType("email");
                                        open();
                                    }}
                                    variant="outline"
                                    color="red"
                                >
                                    Đổi email
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Container>
            </Flex>
            <UpdateModal opened={opened} close={close} type={type} />
        </Flex>
    );
}

const ProfilePageWithAuth = withAuth(ProfilePage, Role.USER);
export default ProfilePageWithAuth;

interface IProfileUpdateDTO {
    displayName: string;
    base64Avatar?: string;
    username: string;
    description: string;
}
