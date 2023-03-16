import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSplice";
const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
