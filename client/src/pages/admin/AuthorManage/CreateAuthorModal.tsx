import { useCreateAuthorMutation } from "@/gql/generated/graphql";
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

interface Props {
    opened: boolean;
    close: () => void;
}

export default function CreateAuthorModal({ opened, close }: Props) {
    const { values, setFieldValue, onSubmit } = useForm<IAuthorCreateDTO>({
        initialValues: {
            name: "",
            description: "",
        },
    });
    const [createAuthor, { loading, data, error }] = useCreateAuthorMutation();
    const onSubmitHandler = useCallback(
        async (formValue: IAuthorCreateDTO) => {
            try {
                await createAuthor({
                    variables: {
                        createAuthorInput: {
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
        [close, createAuthor]
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
interface IAuthorCreateDTO {
    name: string;
    description: string;
}
