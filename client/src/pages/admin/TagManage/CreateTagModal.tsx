import { useCreateTagMutation } from "@/gql/generated/graphql";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

interface Props {
    opened: boolean;
    close: () => void;
}

export default function CreateTagModal({ opened, close }: Props) {
    const { values, setFieldValue, onSubmit } = useForm<ITagCreateDTO>({
        initialValues: {
            name: "",
            description: "",
        },
    });
    const [createTag, { loading, data, error }] = useCreateTagMutation();
    const onSubmitHandler = useCallback(
        async (formValue: ITagCreateDTO) => {
            try {
                await createTag({
                    variables: {
                        createTagInput: {
                            name: formValue.name,
                            description: formValue.description,
                        },
                    },
                });
                notifications.show({
                    message: "Tạo tác giả thành công",
                    title: "Thành công",
                    color: "teal",
                });
                close();
            } catch (e) {
                notifications.show({
                    message: "Tạo tác giả thất bại",
                    title: "Lỗi",
                    color: "red",
                });
            }
        },
        [close, createTag]
    );

    return (
        <Modal opened={opened} onClose={close} title="Tạo tác giả mới" centered>
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
                        Tạo
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
