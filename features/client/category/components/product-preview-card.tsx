import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IProductDetails } from "@/database/schema";

const ProductPreviewCard = ({ data }: { data: IProductDetails }) => {
    return (
        <article className="flex justify-between flex-col p-3 sm:p-5 min-w-52 rounded-md  border border-gray-200 w-full">
            <Link href={`/product/${data.id}`} className="block w-full ">
                <Image
                    src={data.imageUrl}
                    alt={data.name}
                    width={250}
                    height={250}
                    className={"w-full max-h-[250px]"}
                />
            </Link>
            <div className="flex flex-col gap-2 font-space-grotesk">
                <Link href={`/product/${data.id}`}>
                    <h2 className="font-semibold py-2">{data.name}</h2>
                </Link>
                <p className="text-blue-600 cursor-pointer">
                    <span
                        className="font-semibold text-sm text-black hover:text-blue-500"
                        aria-label={`Price: ${data.price}`}
                    >
                        &nbsp;${data.price}
                    </span>
                </p>
                <Button className="px-10" asChild={true}>
                    <Link href={`/product/${data.id}`}>View Details</Link>
                </Button>
            </div>
        </article>
    );
};

export default ProductPreviewCard;
