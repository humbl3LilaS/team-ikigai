import { create } from "zustand";

type State = {
    isOpen: boolean;
    onOpenChange: (payload: boolean) => void;
};

export const useAddVariantDialog = create<State>((set) => ({
    isOpen: false,
    onOpenChange: (payload) => set(() => ({ isOpen: payload })),
}));
