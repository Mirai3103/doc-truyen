import axios from "axios";
import { cookies } from "next/headers";
import moment from "moment";
let getNewAccessTokenPromise: Promise<any> | null = null;
export async function getAccessToken() {
    const cookieStore = cookies();
    let accessToken = cookieStore.get("accessToken");
    if (!accessToken) {
        try {
            accessToken = await tryRefreshToken();
            return accessToken;
        } catch (error) {
            return null;
        }
    }
    return accessToken.value;
}

export async function useUser() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        return null;
    }
    try {
        const res = await axios
            .create({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .get(process.env.SERVER_URI + "/auth/profile");
        return {
            profile: res.data,
            accessToken,
        };
    } catch (error) {
        return null;
    }
}
export async function tryRefreshToken() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    try {
        if (!getNewAccessTokenPromise) {
            getNewAccessTokenPromise = axios
                .create()
                .post(process.env.SERVER_URI + "/auth/getNewAccessToken", { refreshToken });
        }
        const res = await getNewAccessTokenPromise;
        const { accessToken, accessTokenExpiresIn } = res.data;
        cookieStore.set("accessToken", accessToken, {
            expires: moment(moment()).add(accessTokenExpiresIn, "milliseconds").toDate(),
        });
        return accessToken;
    } catch (error) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
    }
    return null;
}
