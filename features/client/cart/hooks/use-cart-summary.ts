import { useCartStore } from "@/features/client/cart/hooks/use-cart-store";
import { useGetCartSummaryInfo } from "@/features/client/cart/hooks/use-get-cart-summary-info";

export const useCartSummary = () => {
    const cart = useCartStore((state) => state.cart);
    const pids = Array.from(new Set(cart.map((item) => item.pid)));
    const { data, isFetching, isError } = useGetCartSummaryInfo(pids);
    if (isFetching || isError) {
        return undefined;
    }
    const getCounts = (pid: string) => {
        return cart
            .filter((item) => item.pid === pid)
            .reduce((acc, val) => acc + val.q, 0);
    };
    const summary =
        data &&
        (data.reduce(
            (acc, val) => {
                const counts = getCounts(val.pid);
                const discount = val.discount ?? 0;
                return {
                    totalPrice:
                        acc.totalPrice +
                        (val.price - (discount / 100) * val.price) * counts,
                    discountedPrice:
                        acc.discountedPrice + (discount / 100) * val.price,
                };
            },
            { totalPrice: 0, discountedPrice: 0 },
        ) as {
            totalPrice: number;
            discountedPrice: number;
        });

    return summary;
};
