import { GraphQLClient } from "graphql-request";
import axios from "axios";
import useUserStore from "@/stores/userStore";
const endpoint = "http://localhost:8080/graphql";
import dayjs from "dayjs";
interface GetAccessTokenResponse {
  data: {
    accessToken: string;
    accessTokenExpiresIn: number;
  };
}
let getNewAccessTokenPromise: Promise<GetAccessTokenResponse> | null = null;

export async function tryRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    useUserStore.getState().logout();
    return null;
  }
  const refreshTokenExpiresInISO = localStorage.getItem(
    "refreshTokenExpiresIn"
  );
  const isTokenExpired = dayjs(refreshTokenExpiresInISO).isBefore(dayjs());
  if (isTokenExpired) {
    useUserStore.getState().logout();
    return null;
  }
  try {
    if (!getNewAccessTokenPromise) {
      getNewAccessTokenPromise = axios
        .create()
        .post("/api/auth/getNewAccessToken", { refreshToken });
    }
    const res = await getNewAccessTokenPromise;

    const { accessToken, accessTokenExpiresIn } = res.data;
    useUserStore.getState().setToken({
      accessToken,
      expiresAt: dayjs(dayjs())
        .add(accessTokenExpiresIn, "milliseconds")
        .toDate(),
    });
    return accessToken;
  } catch (error) {
    useUserStore.getState().logout();
    localStorage.removeItem("refreshToken");
    return null;
  }
}

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

async function getAccessToken() {
  let token = useUserStore.getState().token?.accessToken;
  const isTokenExpired = dayjs(
    useUserStore.getState().token?.expiresAt
  ).isBefore(dayjs());

  if (!token || isTokenExpired) {
    if (await tryRefreshToken()) {
      token = useUserStore.getState().token?.accessToken;
    }
  }
  return token;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const gqlClient = new GraphQLClient(endpoint, {
  fetch: async (url, options = {}) => {
    const token = await getAccessToken();
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return fetch(url, options);
  },
});
