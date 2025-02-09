import React from "react";

import Cart from "@/features/cart/components/cart";

const CartPage = () => {
    return (
        <div className="p-5">
            <h2 className={"text-3xl font-bold font-title"}>Your cart</h2>
            <Cart />
        </div>
    );
};

export default CartPage;
