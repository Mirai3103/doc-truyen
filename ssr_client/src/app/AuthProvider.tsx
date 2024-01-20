"use client";

import { authInterceptor, tryRefreshToken } from "@/core/utils/axios.client.util";
import userStore from "@/store/userStore";
import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import Cookies from "universal-cookie";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userState, setUserState] = useRecoilState(userStore);
    React.useEffect(() => {
        axios.interceptors.request.use(...authInterceptor());
        const cookies = new Cookies();
        const accessToken = cookies.get("accessToken");
        const refreshToken = cookies.get("refreshToken");
        async function tryIdentify() {
            const res = await axios.get("/api/auth/profile");
            setUserState({
                isAuthenticated: true,
                isLoading: false,
                profile: res.data,
            });
        }
        if (!accessToken && !refreshToken) {
            setUserState({
                isAuthenticated: false,
                isLoading: false,
                profile: null,
            });
            return;
        }
        if (accessToken) {
            tryIdentify();
            return;
        }
        if (refreshToken) {
            tryRefreshToken().then(tryIdentify);
        }
    }, []);
    return children;
}
