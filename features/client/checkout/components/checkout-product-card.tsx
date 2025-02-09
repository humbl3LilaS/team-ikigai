import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { ICartItem } from "@/features/client/cart/hooks/use-cart-store";
import { useGetCartItemInfo } from "@/features/client/cart/hooks/use-get-cart-item-info";

type CheckoutProductCardProps = {
    data: ICartItem;
};
const CheckoutProductCard = ({ data }: CheckoutProductCardProps) => {
    const { data: productInfo, isFetching } = useGetCartItemInfo(
        data.pid,
        data.cid,
    );

    return (
        <>
            {isFetching && (
                <div>
                    <Skeleton
                        className={
                            "w-full h-[150px] md:h-[180px] lg:h-[200px] "
                        }
                    />
                </div>
            )}
            {!isFetching && productInfo && (
                <div className={"flex items-center gap-x-4 md:justify-between"}>
                    <div className={" aspect-square"}>
                        <Image
                            src={productInfo.imageUrl}
                            alt={productInfo.name}
                            width={500}
                            height={500}
                            className={
                                "w-20 aspect-square rounded-lg md:w-[150px] lg:w-[200px]"
                            }
                        />
                    </div>
                    <div className={"md:flex-1"}>
                        <h3
                            className={
                                "font-bold uppercase text-lg line-clamp-1"
                            }
                        >
                            {productInfo.name}
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
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckoutProductCard;
