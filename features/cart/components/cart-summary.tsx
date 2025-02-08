const CartSummary = () => {
    const cart: number[] = [];

    return (
        <>
            {cart.length === 0 && (
                <div className="h-fit mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg">
                    <div className="flex items-center justify-center font-bold">
                        <h3 className="text-2xl">Order Summary</h3>
                    </div>
                    <hr />
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Total Items</span>
                        <span className={"font-bold"}>
                            {/* {summary ? `$${summary.totalPrice}` : "..."} */}
                            3
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Subtotal</span>
                        <span className={"font-bold"}>
                            {/* {summary ? `$${summary.totalPrice}` : "..."} */}
                            $ 100
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Discount</span>
                        <span className={"font-bold text-red-500"}>
                            {/* {summary ? `-$${summary?.discountedPrice}` : "..."} */}
                            10%
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Delivery Fee</span>
                        {/* <span className={"font-bold"}>{summary ? "$15" : "..."}</span> */}
                        20
                    </p>
                    <hr />
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black text-xl"}>Total</span>
                        <span className={"font-bold text-2xl"}>
                            {/* {summary
                                    ? `$${summary.totalPrice + 15 - summary.discountedPrice}`
                                    : "..."} */}
                            $ 200
                        </span>
                    </p>
                    <hr />
                    <button
                        className={
                            "flex items-center justify-center text-bold bg-black h-12 text-white"
                        }
                    >
                        <span>Go to Checkout</span>
                    </button>
                </div>
            )}
        </>
    );
};

export default CartSummary;
