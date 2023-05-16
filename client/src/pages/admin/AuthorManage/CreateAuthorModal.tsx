import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

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

    return (
        <Modal opened={opened} onClose={close} title="Tạo tác giả mới" centered>
            <form className="flex gap-3 flex-col">
                <TextInput
                    label="Tên tác giả"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                />
                <Textarea placeholder="Giới thiệu" label="Giới thiệu" withAsterisk />
                <Group position="right" spacing={"xl"}>
                    <Button color="blue" variant="light" onClick={close}>
                        Hủy
                    </Button>
                    <Button color="blue" type="submit">
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
