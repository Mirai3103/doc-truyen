import { useUpdateUserMutation } from "@/gql/generated/graphql";
import { Role } from "@/redux/userSplice";
import { Button, Group, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useCallback } from "react";

interface Props {
    opened: boolean;
    close: () => void;
    onSaved: () => void;
    user?: IUserUpdateDTO | null;
}

export default function UpdateUserModal({ opened, close, onSaved, user }: Props) {
    const { values, setFieldValue, onSubmit } = useForm<IUserUpdateDTO>({
        initialValues: user || {
            _id: "",
            displayName: "",
            email: "",
            role: Role.USER,
            username: "",
            description: "",
        },
    });
    const [updateUser, { loading, data, error }] = useUpdateUserMutation();
    const onSubmitHandler = useCallback(
        async (formValue: IUserUpdateDTO) => {
            try {
                await updateUser({
                    variables: {
                        updateUserInput: {
                            email: formValue.email,
                            description: formValue.description || "",
                            displayName: formValue.displayName,
                            username: formValue.username,
                        },
                        id: user?._id || "",
                    },
                });
                notifications.show({
                    message: "Cập người dùng thành công",
                    title: "Thành công",
                    color: "teal",
                });
                onSaved();
                close();
            } catch (e) {
                console.log(error);
                notifications.show({
                    message: "Cập người dùng thất bại",
                    title: "Lỗi",
                    color: "red",
                });
            }
        },
        [user?._id, close, onSaved, updateUser]
    );
    React.useEffect(() => {
        setFieldValue("username", user?.username || "");
        setFieldValue("displayName", user?.displayName || "");
        setFieldValue("email", user?.email || "");
        setFieldValue("role", user?.role || Role.USER);
        setFieldValue("description", user?.description || "");
    }, [user, setFieldValue]);
    return (
        <Modal opened={opened} onClose={close} title="Cập nhật người dùng " centered>
            <form className="flex gap-3 flex-col" onSubmit={onSubmit(onSubmitHandler)}>
                <TextInput
                    label="Tên hiển thị"
                    value={values.displayName}
                    onChange={(e) => setFieldValue("displayName", e.currentTarget.value)}
                />
                <TextInput
                    label="Tên đăng nhập"
                    value={values.username}
                    onChange={(e) => setFieldValue("username", e.currentTarget.value)}
                />
                <TextInput
                    label="Email"
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.currentTarget.value)}
                />
                <Select
                    label="Quyền"
                    value={values.role + ""}
                    onChange={(e) => setFieldValue("role", Number(e))}
                    data={[
                        { value: Role.USER + "", label: "Người dùng" },
                        { value: Role.CREATOR + "", label: "Người đóng góp" },
                    ]}
                />

                <Textarea
                    placeholder="Giới thiệu"
                    label="Giới thiệu"
                    withAsterisk
                    value={values.description}
                    onChange={(e) => setFieldValue("description", e.currentTarget.value)}
                />
                <Group position="right" spacing={"xl"}>
                    <Button color="blue" variant="light" onClick={close} disabled={loading}>
                        Hủy
                    </Button>
                    <Button color="blue" type="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
export interface IUserUpdateDTO {
    _id: string;
    displayName: string;
    email: string;
    role: number;
    username: string;
    description: string;
}
