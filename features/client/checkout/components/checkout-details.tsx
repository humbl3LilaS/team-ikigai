import { useCartSummary } from "@/features/client/cart/hooks/use-cart-summary";

const CheckoutDetails = () => {
    const summary = useCartSummary();
    return (
        <div className={"mt-4 flex flex-col gap-y-3"}>
            <p className={"flex items-end justify-between"}>
                <span className={"text-black/40 font-bold"}>Total:</span>
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
                <span className={"font-bold"}>{summary ? "$15" : "..."}</span>
            </p>
            <hr />
            <p className={"flex items-end justify-between"}>
                <span className={"text-black font-bold"}>Sub Total</span>
                <span className={"font-bold"}>
                    {summary
                        ? `$${summary.totalPrice + 15 - summary.discountedPrice}`
                        : "..."}
                </span>
            </p>
        </div>
    );
};

export default CheckoutDetails;
