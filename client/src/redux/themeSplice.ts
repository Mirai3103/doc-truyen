import store, { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
    mode: "light" | "dark";
}

const initialState: ThemeState = {
    mode: "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state: ThemeState, action: PayloadAction<"light" | "dark">) => {
            state.mode = action.payload;
        },
        toggleTheme: (state: ThemeState) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.theme.mode;
