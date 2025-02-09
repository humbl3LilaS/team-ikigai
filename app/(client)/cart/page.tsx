import React from "react";

import Cart from "@/features/client/cart/components/cart";

const CartPage = () => {
    return (
        <section className=" py-20 px-6 md:px-10 lg:px-24">
            <h2 className={"text-3xl font-bold font-title"}>Your cart</h2>
            <Cart />
        </section>
    );
};

export default CartPage;
