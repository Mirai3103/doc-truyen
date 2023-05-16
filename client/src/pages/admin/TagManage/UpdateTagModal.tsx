import { useUpdateTagMutation } from "@/gql/generated/graphql";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useCallback } from "react";

interface Props {
    opened: boolean;
    close: () => void;
    onSaved: () => void;
    tag?: ({ _id: string } & ITagCreateDTO) | null;
}

export default function UpdateTagModal({ opened, close, onSaved, tag }: Props) {
    const { values, setFieldValue, onSubmit } = useForm<ITagCreateDTO>({
        initialValues: tag || {
            name: "",
            description: "",
        },
    });
    const [updateTag, { loading, data, error }] = useUpdateTagMutation();
    const onSubmitHandler = useCallback(
        async (formValue: ITagCreateDTO) => {
            try {
                await updateTag({
                    variables: {
                        UpdateTagInput: {
                            name: formValue.name,
                            description: formValue.description,
                        },
                        id: tag?._id || "",
                    },
                });
                console.log(data);
                notifications.show({
                    message: "Cập tag thành công",
                    title: "Thành công",
                    color: "teal",
                });
                onSaved();
                close();
            } catch (e) {
                notifications.show({
                    message: "Tạo tag thất bại",
                    title: "Lỗi",
                    color: "red",
                });
            }
        },
        [updateTag, tag?._id, data, onSaved, close]
    );
    React.useEffect(() => {
        setFieldValue("name", tag?.name || "");
        setFieldValue("description", tag?.description || "");
    }, [tag?.description, tag?.name, setFieldValue]);
    return (
        <Modal opened={opened} onClose={close} title="Cập nhật tag " centered>
            <form className="flex gap-3 flex-col" onSubmit={onSubmit(onSubmitHandler)}>
                <TextInput
                    label="Tên tag"
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
interface ITagCreateDTO {
    name: string;
    description: string;
}
