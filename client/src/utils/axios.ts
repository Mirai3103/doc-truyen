import store from "@/redux/store";
import { setAccessToken, setToken } from "@/redux/userSplice";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";
import jwtDecode from "jwt-decode";
const api = axios.create({
    baseURL: process.env.VITE_SERVER_URL || "http://localhost:3000",
});
let accessTokenPromise: Promise<string> | null = null;
api.interceptors.request.use(
    async (config) => {
        const accessToken = store.getState().user.accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !store.getState().user.isAuthenticated) {
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (!accessTokenPromise) {
                accessTokenPromise = reNewAccessToken();
            }
            const accessToken = await accessTokenPromise;
            store.dispatch(setAccessToken(accessToken));
            accessTokenPromise = null;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

const reNewAccessToken = async () => {
    const refreshToken = store.getState().user.refreshToken;
    const response = await api.post(
        `${process.env.VITE_SERVER_URL || "http://localhost:3000"}/auth/getNewAccessToken`,
        {
            refreshToken,
        }
    );
    if (response.status === 401) {
        localStorage.removeItem("refreshToken");

        store.dispatch(
            setToken({
                accessToken: "",
                refreshToken: "",
            })
        );
        return null;
    }

    return response.data.accessToken;
};

export default api;
const authLink = setContext(async (_, { headers }) => {
    const token = store.getState().user.accessToken;
    if (!token && !store.getState().user.refreshToken) {
        return {
            headers: {
                ...headers,
                authorization: token !== "" ? `Bearer ${token}` : "",
            },
        };
    }
    let isVaild = false;
    try {
        const { exp } = jwtDecode(token) as any;
        if (Date.now() >= exp * 1000) {
            isVaild = false;
        } else {
            isVaild = true;
        }
    } catch {
        isVaild = false;
    }
    if (isVaild) {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            },
        };
    } else {
        if (!accessTokenPromise) {
            accessTokenPromise = reNewAccessToken();
        }
        const accessToken = await accessTokenPromise;
        store.dispatch(setAccessToken(accessToken!));

        return {
            headers: {
                ...headers,
                authorization: `Bearer ${accessToken}`,
            },
        };
    }
});

export { authLink, api };
