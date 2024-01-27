import type { AuthBindings } from "@refinedev/core";

const fakeUser = [
    {
        email: "huuhoag1412@gmail.com",
        password: "Kaito1412",
        role: 10,
    },
];

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        const user = fakeUser.find((item) => item.email === email && item.password === password);
        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: {
                message: "Login Error",
                name: "Invalid email or password",
            },
        };
    },
    check: async (params: any) => ({}),
    logout: async (params: any) => ({}),
    onError: async (params: any) => ({}),
};

export default authProvider;
