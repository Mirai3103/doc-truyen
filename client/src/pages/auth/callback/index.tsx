import { useAppDispatch } from "@/redux/hook";
import { setToken } from "@/redux/userSplice";
import { Navigate, useSearchParams } from "react-router-dom";

export default function Callback() {
    const [params, setParams] = useSearchParams();
    const accessToken = params.get("accesstoken")!;
    const refreshToken = params.get("refreshtoken")!;
    const dispatch = useAppDispatch();
    if (!accessToken || !refreshToken) {
        return <Navigate to={"/login"} />;
    }
    localStorage.setItem("refreshToken", refreshToken!);
    dispatch(
        setToken({
            accessToken,
            refreshToken,
        })
    );

    return <Navigate to={"/"} />;
}
