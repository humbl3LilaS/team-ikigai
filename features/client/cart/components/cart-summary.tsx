"use client";
import { useIsFetching } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";
import { useCartSummary } from "@/features/client/cart/hooks/use-cart-summary";

const CartSummary = () => {
    const cart = useCartStore((state) => state.cart);
    const summary = useCartSummary();
    const numOfFetchingQuery = useIsFetching({ queryKey: ["cart-item"] });

    const router = useRouter();
    return (
        <>
            {cart.length > 0 && (
                <div
                    className={
                        "h-fit mt-4 p-4 border border-black/20 flex flex-col gap-y-4 rounded-lg"
                    }
                >
                    <h3 className={"text-xl font-bold"}>Order Summary</h3>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Subtotal</span>
                        <span className={"font-bold"}>
                            {summary ? `$${summary.totalPrice}` : "..."}
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Discount</span>
                        <span className={"font-bold text-red-500"}>
                            {summary ? `-$${summary?.discountedPrice}` : "..."}
                        </span>
                    </p>
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>DeliveryFee</span>
                        <span className={"font-bold"}>
                            {summary ? "$15" : "..."}
                        </span>
                    </p>
                    <hr />
                    <p className={"flex items-end justify-between"}>
                        <span className={"text-black/40"}>Total</span>
                        <span className={"font-bold"}>
                            {summary
                                ? `$${summary.totalPrice + 15 - summary.discountedPrice}`
                                : "..."}
                        </span>
                    </p>
                    <Button
                        disabled={numOfFetchingQuery !== 0}
                        onClick={() => {
                            router.push("/checkout");
                        }}
                        className={
                            "flex items-center justify-center gap-x-2 bg-black text-white rounded-3xl font-bold"
                        }
                    >
                        <span>Go to Checkout</span>
                        <ArrowRight className={"block size-8"} />
                    </Button>
                </div>
            )}
        </>
    );
};

export default CartSummary;
