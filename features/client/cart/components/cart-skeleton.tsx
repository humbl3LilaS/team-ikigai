import { Skeleton } from "@/components/ui/skeleton";

const CartSkeleton = () => {
    return (
        <>
            <Skeleton className={"block w-full col-span-2 h-[350px]"} />
            <Skeleton className={"block w-full col-span-1 h-[280px]"} />
        </>
    );
};

export default CartSkeleton;
