import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getUserData } from "@/features/client/user/actions/get-user-data";

export type IUser = {
    id: string;
    name: string;
    email: string;
    role?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    region?: string;
    totalSpend?: number;
    latestOrderStatus?: string;
};

type UserStore = {
    user: IUser | null;
    isLoading: boolean;
    fetchUser: (userId: string) => Promise<void>;
    updateUser: (updatedData: Partial<IUser>) => void;
};

export const useUserStore = create<UserStore>()(
    immer((set) => ({
        user: null,
        isLoading: false,

        fetchUser: async (userId) => {
            set({ isLoading: true });

            const userData = await getUserData(userId);

            if (userData) {
                set({ user: userData as IUser });
            }

            set({ isLoading: false });
        },

        updateUser: (updatedData) =>
            set((state) => {
                if (state.user) {
                    state.user = { ...state.user, ...updatedData };
                }
            }),
    })),
);
