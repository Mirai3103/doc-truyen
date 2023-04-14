import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectRefreshToken, setToken } from "@/redux/userSplice";
import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
export default function Logout() {
    const dispatch = useAppDispatch();
    const refreshToken = useAppSelector(selectRefreshToken);
    React.useEffect(() => {
        dispatch(
            setToken({
                accessToken: "",
                refreshToken: "",
            })
        );
        axios.post("auth/logout", {
            refreshToken,
        });
    }, [dispatch, refreshToken]);
    return <Navigate to="/" />;
}
