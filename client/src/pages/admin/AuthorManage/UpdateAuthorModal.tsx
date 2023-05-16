import { useUpdateAuthorMutation } from "@/gql/generated/graphql";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useCallback } from "react";

interface Props {
    opened: boolean;
    close: () => void;
    onSaved: () => void;
    author?: ({ _id: string } & IAuthorCreateDTO) | null;
}

export default function UpdateAuthorModal({ opened, close, onSaved, author }: Props) {
    const { values, setFieldValue, onSubmit } = useForm<IAuthorCreateDTO>({
        initialValues: author || {
            name: "",
            description: "",
        },
    });
    const [updateAuthor, { loading, data, error }] = useUpdateAuthorMutation();
    const onSubmitHandler = useCallback(
        async (formValue: IAuthorCreateDTO) => {
            try {
                await updateAuthor({
                    variables: {
                        UpdateAuthorInput: {
                            name: formValue.name,
                            description: formValue.description,
                        },
                        id: author?._id || "",
                    },
                });
                console.log(data);
                notifications.show({
                    message: "Cập tác giả thành công",
                    title: "Thành công",
                    color: "teal",
                });
                onSaved();
                close();
            } catch (e) {
                notifications.show({
                    message: "Tạo tác giả thất bại",
                    title: "Lỗi",
                    color: "red",
                });
            }
        },
        [author?._id, close, onSaved, updateAuthor]
    );
    React.useEffect(() => {
        setFieldValue("name", author?.name || "");
        setFieldValue("description", author?.description || "");
    }, [author?.description, author?.name, setFieldValue]);
    return (
        <Modal opened={opened} onClose={close} title="Cập nhật tác giả " centered>
            <form className="flex gap-3 flex-col" onSubmit={onSubmit(onSubmitHandler)}>
                <TextInput
                    label="Tên tác giả"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.currentTarget.value)}
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
interface IAuthorCreateDTO {
    name: string;
    description: string;
}
