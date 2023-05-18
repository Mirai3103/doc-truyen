import { useUpdateImportantUserInfoMutation } from "@/gql/generated/graphql";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

interface IProps {
    opened: boolean;
    close: () => void;
    type: "email" | "password";
}

export function UpdateModal({ opened, close, type }: IProps) {
    const [updateImportantFieldsMutation, { loading }] = useUpdateImportantUserInfoMutation();
    const { values, onSubmit, setFieldValue } = useForm<IUpdateImportantFieldsDTO>({
        initialValues: {
            fieldValue: "",
            password: "",
        },
    });
    const onSubmitForm = async (values: IUpdateImportantFieldsDTO) => {
        await updateImportantFieldsMutation({
            variables: {
                updateUserInput: {
                    password: values.password,
                    newPassword: type === "password" ? values.fieldValue : undefined,
                    email: type === "email" ? values.fieldValue : undefined,
                },
            },
        });
        notifications.show({
            message: "Đổi " + type + " thành công",
            color: "green",
            title: "Thành công",
        });
    };
    return (
        <Modal centered opened={opened} onClose={close} title={`Đổi  ${type}`}>
            <form className="flex flex-col gap-5" onSubmit={onSubmit(onSubmitForm)}>
                <TextInput
                    required
                    label="Mật khẩu"
                    type="password"
                    value={values.password}
                    onChange={(event) => {
                        setFieldValue("password", event.currentTarget.value);
                    }}
                />
                <TextInput
                    required
                    label={type === "email" ? "Email mới" : "Mật khẩu mới"}
                    type={type === "email" ? "email" : "password"}
                    value={values.fieldValue}
                    onChange={(event) => {
                        setFieldValue("fieldValue", event.currentTarget.value);
                    }}
                />
                <Group position="right">
                    <Button onClick={close} variant="light">
                        Hủy
                    </Button>
                    <Button type="submit" loading={loading} variant="filled">
                        Lưu
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}

interface IUpdateImportantFieldsDTO {
    fieldValue: string;
    password: string;
}
