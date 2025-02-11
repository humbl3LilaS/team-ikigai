"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import QuantityController from "@/features/client/cart/components/quantity-controller";
import {
    ICartItem,
    useCartStore,
} from "@/features/client/cart/hooks/use-cart-store";
import { useGetCartItemInfo } from "@/features/client/cart/hooks/use-get-cart-item-info";

const CartItem = ({ data }: { data: ICartItem }) => {
    const { data: productInfo, isLoading } = useGetCartItemInfo(
        data.pid,
        data.cid,
    );
    const queryClient = useQueryClient();

    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const removeHandler = () => {
        removeFromCart({ pid: data.pid, cid: data.cid });
        queryClient.removeQueries({
            queryKey: ["cart-item", data.pid, data.cid],
        });
    };

    return (
        <>
            {isLoading && (
                <div>
                    <Skeleton className={"w-full h-[200px] "} />
                </div>
            )}
            {!isLoading && productInfo && (
                <div className={"flex items-center gap-x-4 md:justify-between"}>
                    <div className={" aspect-square"}>
                        <Image
                            src={productInfo.imageUrl}
                            alt={productInfo.name}
                            width={200}
                            height={200}
                            className={
                                "w-24 aspect-square rounded-lg md:w-[150px] "
                            }
                        />
                    </div>
                    <div className={"md:flex-1"}>
                        <h3
                            className={
                                "flex items-center justify-between uppercase  gap-x-4"
                            }
                        >
                            <span className={"font-bold text-lg line-clamp-1"}>
                                {productInfo.name}
                            </span>
                            <Button variant={"link"} onClick={removeHandler}>
                                <Trash color={"red"} />
                            </Button>
                        </h3>
                        <p className={"flex items-center gap-x-4"}>
                            <span className={"text-sm"}>Color: </span>
                            <span className={"sr-only"}>
                                {productInfo.colorHex}
                            </span>
                            <span
                                className={
                                    "block w-6 aspect-square rounded-full"
                                }
                                style={{
                                    backgroundColor: `${productInfo.colorHex}`,
                                }}
                            />
                        </p>
                        <p className={"text-sm"}>
                            <span>Quantity: </span>
                            <span>{data.q}</span>
                        </p>
                        <div className={"flex items-center justify-between"}>
                            <p className={"text-xl font-bold"}>
                                ${data.q * productInfo.price}
                            </p>
                            <QuantityController data={data} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartItem;
