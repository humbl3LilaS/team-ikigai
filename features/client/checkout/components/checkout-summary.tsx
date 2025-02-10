"use client";

import { useEffect } from "react";

import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";
import CheckoutDetails from "@/features/client/checkout/components/checkout-details";
import CheckoutProductList from "@/features/client/checkout/components/checkout-product-list";

const CheckoutSummary = () => {
    const bulkAdd = useCartStore((state) => state.bulkAdd);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") ?? `[]`);
        bulkAdd(cart);
    }, [bulkAdd]);
    return (
        <div className="p-6 border border-black/20 rounded-lg">
            <CheckoutProductList />
            <CheckoutDetails />
        </div>
    );
};

export default CheckoutSummary;
