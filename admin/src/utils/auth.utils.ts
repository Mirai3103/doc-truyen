/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import useUserStore from "@/stores/userStore";
import { axiosInstance, tryRefreshToken } from "./request";
import dayjs from "dayjs";
export enum Role {
  ADMIN = 10,
  CREATOR = 5,
  USER = 1,
}
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  useUserStore.getState().setIsLoading(true);
  try {
    const res1 = await axiosInstance.post("/api/auth/login", {
      username: email,
      password,
    });
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    } = res1.data;
    useUserStore.getState().setToken({
      accessToken,
      expiresAt: dayjs(dayjs())
        .add(accessTokenExpiresIn, "milliseconds")
        .toDate(),
    });
    localStorage.setItem("refreshToken", refreshToken);
    const dateWillBeExpired = dayjs(dayjs())
      .add(refreshTokenExpiresIn, "milliseconds")
      .toISOString();
    localStorage.setItem("refreshTokenExpiresIn", dateWillBeExpired);
    const profile = await fetchProfile(accessToken);
    useUserStore.getState().setUserState({
      isAuthenticated: true,
      isLoading: false,
      profile,
    });
    if (profile.role < Role.CREATOR) {
      logout({});
      return {
        success: false,
        error: {
          message: "Bạn không có quyền truy cập",
          name: "Unauthorized",
          statusCode: 403,
        },
      };
    }
    return {
      success: true,
      redirectTo: "/dashboard",
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Sai tên đăng nhập hoặc mật khẩu",
        name: "Đăng nhập thất bại",
        statusCode: 401,
      },
    };
  }
};
export const checkIsAuthenticated = async (params: any) => {
  useUserStore.getState().setIsLoading(true);

  let accessToken: string | null | undefined =
    useUserStore.getState().token?.accessToken;
  if (!accessToken) {
    accessToken = await tryRefreshToken();
  }
  if (!accessToken) {
    useUserStore.getState().logout();
    return {
      success: false,
      authenticated: false,
      error: {
        message: "Check Error",
        name: "Unauthorized",
      },
    };
  }
  const profile = await fetchProfile(accessToken);
  useUserStore.getState().setUserState({
    isAuthenticated: true,
    isLoading: false,
    profile,
  });
  return {
    success: true,
    authenticated: true,
  };
};
export const logout = async (params: any) => {
  useUserStore.getState().logout();
  return {
    success: true,
  };
};

export const getIdentity = async (params: any) => {
  const profile = useUserStore.getState().profile;
  if (profile) {
    return {
      success: true,
      profile,
    };
  }
  return {
    success: false,
    error: {
      message: "Get Identity Error",
      name: "Unauthorized",
    },
  };
};

async function fetchProfile(access_token: string) {
  const res = await axiosInstance.get("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
}
