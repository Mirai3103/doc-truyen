import { FacebookButton, GoogleButton } from "@/components/SocialButtons";
import {
    Anchor,
    Button,
    Divider,
    Grid,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import React from "react";
import { Outlet } from "react-router-dom";
interface Props extends PaperProps {
    authType: "đăng nhập" | "đăng ký";
}
export default function LoginPage({ authType = "đăng nhập", ...props }: Props) {
    const [type, toggle] = useToggle(["đăng nhập", "đăng ký"]);
    React.useEffect(() => {
        if (authType !== type) {
            toggle();
        }
    }, [authType, toggle, type]);
    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            password: "",
            terms: true,
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val: string) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
        },
    });
    const onGoogleLogin = async (e: any) => {
        window.open("http://localhost:3000/auth/google", "_self");
    };
    return (
        <Grid h={"100vh"} className="place-content-center items-center place-items-center">
            <Paper
                className="mx-auto w-[calc(100%-32px)]
                 sm:w-[400px] sm:mx-0"
                mt="-200px"
                radius="md"
                p="xl"
                withBorder
                {...props}
            >
                <Text size="xl" weight={500}>
                    Chào bạn, {type} với
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton size={"lg"} radius="xl" onClick={onGoogleLogin}>
                        Google
                    </GoogleButton>

                    <FacebookButton size={"lg"} radius="xl">
                        Facebook
                    </FacebookButton>
                </Group>

                <Divider label="Hoặc sử dụng email/username" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(() => {})}>
                    <Stack>
                        {type === "đăng ký" && (
                            <TextInput
                                size={"md"}
                                label="Username"
                                placeholder="Tên đăng nhập"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            size={"md"}
                            required
                            label="Email"
                            placeholder="Email của bạn"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                            error={form.errors.email && "Invalid email"}
                            radius="md"
                        />

                        <PasswordInput
                            size={"md"}
                            required
                            label="Mật khẩu"
                            placeholder="Mật khẩu của bạn"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                            error={form.errors.password && "Password should include at least 6 characters"}
                            radius="md"
                        />
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="sm">
                            {type === "đăng ký" ? "Bạn đã có tài khoản?" : "Chưa có tài khoản?"}
                        </Anchor>
                        <Button type="submit" radius="xl" size={"md"}>
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
            <Outlet />
        </Grid>
    );
}
