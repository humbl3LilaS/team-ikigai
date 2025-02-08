import { create } from "zustand";

type State = {
    isOpen: boolean;
    toggleOpen: () => void;
};

export const useSidebarState = create<State>((set) => ({
    isOpen: true,
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
