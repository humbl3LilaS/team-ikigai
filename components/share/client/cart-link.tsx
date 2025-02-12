"use client";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
    ICartItem,
    useCartStore,
} from "@/features/client/cart/hooks/use-cart-store";

const CartLink = () => {
    const totalQuantity = useCartStore((state) => state.totalQuantity);
    const bulkAdd = useCartStore((state) => state.bulkAdd);
    useEffect(() => {
        const localCart = JSON.parse(
            localStorage.getItem("cart") ?? `[]`,
        ) as ICartItem[];
        bulkAdd(localCart);
    }, [bulkAdd]);

    return (
        <Button
            className="bg-transparent text-black hover:bg-transparent hover:text-blue-500 relative border"
            asChild={true}
        >
            <Link href={"/cart"}>
                <ShoppingCartIcon className="w-6 h-6" />
                {totalQuantity && (
                    <span
                        className={`absolute flex justify-center items-center -top-2 w-5 h-5 -right-2 text-white bg-red-500 rounded-full `}
                    >
                        <span>{totalQuantity}</span>
                    </span>
                )}
            </Link>
        </Button>
    );
};

export default CartLink;
