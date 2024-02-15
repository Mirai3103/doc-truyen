import axios from "axios";
import { create } from "zustand";
type Profile = {
  [key: string]: string | number | undefined;
} | null;
interface UserState {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: Profile;
  token?: {
    expiresAt: Date;
    accessToken: string;
  };
}

interface Actions {
  setProfile: (profile: Profile) => void;
  setUserState: (state: Partial<UserState>) => void;
  setToken: (token: { expiresAt: Date; accessToken: string }) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

const useUserStore = create<UserState & Actions>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  profile: null,
  token: undefined,
  setProfile: (profile) =>
    set({ profile, isAuthenticated: !!profile, isLoading: false }),
  setUserState: (state) => set(state),
  setToken: (token) =>
    set({ token, isAuthenticated: !!token, isLoading: false }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    localStorage.getItem("refreshToken") &&
      axios.post("/api/auth/logout", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
    localStorage.removeItem("refreshToken");
    set({ isAuthenticated: false, profile: null, token: undefined });
  },
}));

export default useUserStore;
