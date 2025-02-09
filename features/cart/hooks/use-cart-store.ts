import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ICartItem = {
    pid: string;
    cid: string;
    q: number;
};

type Store = {
    cart: ICartItem[];
    addToCart: (item: ICartItem) => void;
    increaseQuantity: (payload: ICartItem & { qty?: number }) => void;
    reduceQuantity: (payload: ICartItem) => void;
    removeFromCart: (item: ICartItem) => void;
    emptyCart: () => void;
};

const getItemsInCart = (): ICartItem[] => {
    if (typeof window === "undefined") {
        return [];
    }
    const cart = sessionStorage.getItem("cart") ?? `[]`;
    return JSON.parse(cart);
};

export const useCartStore = create<Store>()(
    immer((set) => ({
        cart: getItemsInCart(),
        addToCart: (payload) =>
            set((state) => {
                state.cart.push(payload);
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        increaseQuantity: (payload) =>
            set((state) => {
                state.cart = state.cart.map((item) => {
                    if (item.pid === payload.pid && item.cid === payload.cid) {
                        return {
                            ...item,
                            q: item.q + (payload.qty ?? 1),
                        };
                    }
                    return item;
                });
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        reduceQuantity: (payload) =>
            set((state) => {
                state.cart = state.cart.map((item) => {
                    if (item.pid === payload.pid && item.cid === payload.cid) {
                        return {
                            ...item,
                            q: item.q - 1,
                        };
                    }
                    return item;
                });
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        removeFromCart: (payload) =>
            set((state) => {
                state.cart = state.cart.filter(
                    (item) =>
                        item.pid !== payload.pid && item.cid !== payload.cid,
                );
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        emptyCart: () =>
            set((state) => {
                state.cart = [];
                sessionStorage.setItem("cart", JSON.stringify(state.cart));
            }),
    })),
);
