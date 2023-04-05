import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSplice";
import { userSlice } from "./userSplice";
const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
