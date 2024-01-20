import axios, { AxiosInterceptorManager, InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
let getNewAccessTokenPromise: Promise<any> | null = null;
export async function tryRefreshToken() {
    const cookies = new Cookies();
    const refreshToken = cookies.get("refreshToken");
    try {
        if (!getNewAccessTokenPromise) {
            getNewAccessTokenPromise = axios.create().post("/api/auth/getNewAccessToken", { refreshToken });
        }
        const res = await getNewAccessTokenPromise;

        const { accessToken } = res.data;
        cookies.set("accessToken", accessToken, { path: "/" });
        return accessToken;
    } catch (error) {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
    }
    return null;
}

export function authInterceptor() {
    const onFulfilled = async (config: InternalAxiosRequestConfig) => {
        console.log("authInterceptor");
        const cookies = new Cookies();
        const accessToken = cookies.get("accessToken");
        const refreshToken = cookies.get("refreshToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        if (refreshToken) {
            await tryRefreshToken();
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    };
    const onRejected = (error: any) => {
        return Promise.reject(error);
    };
    return [onFulfilled, onRejected];
}
