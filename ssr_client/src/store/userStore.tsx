import { atom } from "recoil";

interface UserState {
    isAuthenticated: boolean;
    isLoading: boolean;
    profile: {
        [key: string]: string;
    } | null;
}

const userState = atom<UserState>({
    key: "userState",
    default: {
        isAuthenticated: false,
        isLoading: true,
        profile: {},
    } as UserState,
});

export default userState;
