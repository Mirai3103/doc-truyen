import { FacebookButton, GoogleButton } from "@/components/SocialButtons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectIsAuthenticated, setToken } from "@/redux/userSplice";
import api from "@/utils/axios";
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
import { notifications } from "@mantine/notifications";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
interface Props extends PaperProps {
    authType: "đăng nhập" | "đăng ký";
}
export default function LoginPage({ authType = "đăng nhập", ...props }: Props) {
    const [type, toggle] = useToggle(["đăng nhập", "đăng ký"]);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (authType !== type) {
            toggle();
        }
    }, [authType, toggle, type]);

    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            rawPassword: "",
            terms: true,
        },

        validate: {
            email: (val: string) => {
                if (type === "đăng nhập") {
                    return null;
                }
                return /^\S+@\S+$/.test(val) ? null : "Email không hợp lệ";
            },
            rawPassword: (val: string) => (val.length <= 6 ? "Mật khẩu phải có ít nhất 6 ký tự" : null),
            username: (val: string) => {
                if (type === "đăng nhập") {
                    return null;
                }
                if (val.length < 3) {
                    return "Tên đăng nhập phải có ít nhất 3 ký tự";
                }

                if (val.length > 20) {
                    return "Tên đăng nhập không được quá 20 ký tự";
                }
                if (!/^[a-z0-9_-]{3,20}$/.test(val)) {
                    return "Tên đăng nhập không được chứa ký tự đặc biệt";
                }

                return null;
            },
        },
    });
    React.useEffect(() => {
        form.reset();
    }, [authType, type]);
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }
    const onGoogleLogin = async (e: any) => {
        window.open(`${process.env.SERVER_URL || "http://localhost:3000"}/auth/google`, "_self");
    };
    const onFacebookLogin = async (e: any) => {
        notifications.show({
            title: "Lỗi",
            message: "Chức năng đang được phát triển",
            color: "red",
        });
    };
    const onClic = async (e: any) => {
        console.log(form.errors, form.values);
    };
    const onSubmit = async (e: any) => {
        if (type === "đăng nhập") {
            api.post("auth/login", {
                username: form.values.email,
                password: form.values.rawPassword,
            })
                .then((res) => {
                    const { accessToken, refreshToken } = res.data;
                    dispatch(setToken({ accessToken, refreshToken }));
                    notifications.show({
                        title: "Thành công",
                        message: "Đăng nhập thành công",
                        color: "green",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    notifications.show({
                        title: "Lỗi",
                        message: "Email hoặc mật khẩu không đúng",
                        color: "red",
                    });
                });
        } else {
            api.post("auth/register", {
                username: form.values.username,
                email: form.values.email,
                rawPassword: form.values.rawPassword,
                displayName: form.values.username,
            })
                .then((res) => {
                    notifications.show({
                        title: "Thành công",
                        message: "Đăng ký thành công, mời đăng nhập!",
                        color: "green",
                    });
                    navigate("/login");
                })
                .catch((err) => {
                    notifications.show({
                        title: "Lỗi",
                        message: err.response.data.message,
                        color: "red",
                    });
                });
        }
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

                    <FacebookButton size={"lg"} radius="xl" onClick={onFacebookLogin}>
                        Facebook
                    </FacebookButton>
                </Group>

                <Divider label="Hoặc sử dụng email/username" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        {type === "đăng ký" && (
                            <TextInput
                                required
                                size={"md"}
                                label="Username"
                                placeholder="Tên đăng nhập"
                                value={form.values.username}
                                onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            size={"md"}
                            required
                            label={type === "đăng ký" ? "Email" : "Email hoặc username"}
                            placeholder={type === "đăng ký" ? "Email " : "Email hoặc username "}
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                            error={type === "đăng ký" ? form.errors.email : null}
                            radius="md"
                        />

                        <PasswordInput
                            size={"md"}
                            required
                            label="Mật khẩu"
                            placeholder="Mật khẩu "
                            value={form.values.rawPassword}
                            onChange={(event) => form.setFieldValue("rawPassword", event.currentTarget.value)}
                            error={form.errors.rawPassword && "Mật khẩu phải có ít nhất 6 ký tự"}
                            radius="md"
                        />
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => {
                                if (type === "đăng ký") {
                                    navigate("/login");
                                } else {
                                    navigate("/register");
                                }
                            }}
                            size="sm"
                        >
                            {type === "đăng ký" ? "Bạn đã có tài khoản?" : "Chưa có tài khoản?"}
                        </Anchor>
                        <Button type="submit" radius="xl" size={"md"} onClick={onClic}>
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
            <Outlet />
        </Grid>
    );
}
