import { create } from "zustand";

type Type = {
    isOpen: boolean;
    setOpen: (payload: boolean) => void;
};

export const useExchangeDialog = create<Type>((set) => ({
    isOpen: false,
    setOpen: (payload) => {
        set(() => ({ isOpen: payload }));
    },
}));
