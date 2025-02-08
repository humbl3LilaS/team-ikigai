import React from "react";
import CartList from "./cart-list";
import CartSummary from "./cart-summary";

const Cart = () => {
    return (
        <div className={"md:grid gap-x-4 grid-cols-3"}>
            <CartList />
            <CartSummary />
        </div>
    );
};

export default Cart;
