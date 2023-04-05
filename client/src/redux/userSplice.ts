import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { RootState } from "./store";

export enum Role {
    ADMIN = 10,
    CREATOR = 5,
    USER = 1,
}
interface UserState {
    userProfile: {
        _id: string;
        username: string;
        avatarUrl: string;
        email: string;
        displayName: string;
        role: Role;
    } | null;
    isAuthenticated: boolean;
    accessToken: string;
    refreshToken: string;
}

const initialState: UserState = {
    userProfile: null,
    isAuthenticated: false,
    accessToken: "",
    refreshToken: localStorage.getItem("refreshToken") || "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = false;
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            if (state.accessToken === "") return;
            const userProfile = jwtDecode(action.payload.accessToken) as JwtPayload;
            state.userProfile = {
                _id: userProfile.sub,
                username: userProfile.username,
                avatarUrl: userProfile.avatarUrl,
                email: userProfile.email,
                displayName: userProfile.displayName,
                role: userProfile.role,
            };
            state.isAuthenticated = true;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isAuthenticated = false;
            if (action.payload === "") return;
            const userProfile = jwtDecode(action.payload) as JwtPayload;
            state.userProfile = {
                _id: userProfile.sub,
                username: userProfile.username,
                avatarUrl: userProfile.avatarUrl,
                email: userProfile.email,
                displayName: userProfile.displayName,
                role: userProfile.role,
            };
            state.isAuthenticated = true;
        },
    },
});

export const { setToken, setAccessToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserProfile = (state: RootState) => state.user.userProfile;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

interface JwtPayload {
    username: string;
    sub: string;
    role: Role;
    email: string;
    displayName: string;
    avatarUrl: string;
    exp: number;
}
