import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ICartItem = {
    pid: string;
    cid: string;
    q: number;
};

type Store = {
    cart: ICartItem[];
    bulkAdd: (payload: ICartItem[]) => void;
    totalQuantity: number;
    addToCart: (item: ICartItem) => void;
    increaseQuantity: (payload: {
        pid: string;
        cid: string;
        qty?: number;
    }) => void;
    reduceQuantity: (payload: ICartItem) => void;
    removeFromCart: (item: ICartItem) => void;
    emptyCart: () => void;
};

export const useCartStore = create<Store>()(
    immer((set) => ({
        cart: [] as ICartItem[],
        bulkAdd: (payload) =>
            set((state) => {
                state.cart = payload;
                localStorage.setItem("cart", JSON.stringify(state.cart));
                state.totalQuantity = state.cart.reduce(
                    (acc, curr) => acc + curr.q,
                    0,
                );
            }),
        totalQuantity: 0,
        addToCart: (payload) =>
            set((state) => {
                state.cart.push(payload);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                state.totalQuantity = state.totalQuantity + payload.q;
            }),
        increaseQuantity: (payload) =>
            set((state) => {
                state.cart = state.cart.map((item) => {
                    if (item.pid === payload.pid && item.cid === payload.cid) {
                        state.totalQuantity =
                            state.totalQuantity + (payload.qty ?? 1);
                        return {
                            ...item,
                            q: item.q + (payload.qty ?? 1),
                        };
                    }
                    return item;
                });
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        reduceQuantity: (payload) =>
            set((state) => {
                state.cart = state.cart.map((item) => {
                    if (item.pid === payload.pid && item.cid === payload.cid) {
                        state.totalQuantity = state.totalQuantity - 1;
                        return {
                            ...item,
                            q: item.q - 1,
                        };
                    }
                    return item;
                });
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        removeFromCart: (payload) =>
            set((state) => {
                state.cart = state.cart.filter(
                    (item) =>
                        item.pid !== payload.pid || item.cid !== payload.cid,
                );
                state.totalQuantity = state.totalQuantity - payload.q;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }),
        emptyCart: () =>
            set((state) => {
                state.cart = [];
                state.totalQuantity = 0;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }),
    })),
);
