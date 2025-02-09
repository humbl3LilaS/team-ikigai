"use client";

import { useEffect, useState } from "react";

import CartSkeleton from "@/features/client/cart/components/cart-skeleton";
import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";

import CartList from "./cart-list";
import CartSummary from "./cart-summary";

const Cart = () => {
    const bulkAdd = useCartStore((state) => state.bulkAdd);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") ?? `[]`);
        bulkAdd(cart);
        setLoading(false);
    }, [bulkAdd, setLoading]);
    return (
        <div className={"md:grid gap-x-4 grid-cols-3"}>
            {loading ? (
                <CartSkeleton />
            ) : (
                <>
                    <CartList />
                    <CartSummary />
                </>
            )}
        </div>
    );
};

export default Cart;
