"use client";

import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";
import CheckoutProductCard from "@/features/client/checkout/components/checkout-product-card";

const CheckoutProductList = () => {
    const cart = useCartStore((state) => state.cart);
    return (
        <div className="flex flex-col gap-y-3">
            {cart.map((item) => (
                <CheckoutProductCard data={item} key={item.pid + item.cid} />
            ))}
        </div>
    );
};

export default CheckoutProductList;
