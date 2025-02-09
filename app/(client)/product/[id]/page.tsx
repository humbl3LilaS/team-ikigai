import { notFound } from "next/navigation";

import { getProductById } from "@/actions/get-product-by-id";
import AddToCartForm from "@/features/client/cart/components/add-to-cart-form";
import ProductSlider from "@/features/client/product/components/product-slider";

const ProductDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    if (!id) {
        return notFound();
    }

    const productInfo = await getProductById(id);
    if (!productInfo) {
        return notFound();
    }
    return (
        <section className="w-full p-6 md:p-10 lg:p-24">
            <div className={"w-full grid grid-cols-1 md:grid-cols-2"}>
                <div className="flex p-5 place-items-end  gap-5 sm:gap-10 flex-col">
                    <div className="w-full flex flex-col gap-10">
                        <ProductSlider images={[productInfo.imageUrl]} />
                    </div>
                </div>
                <div className="p-5 flex flex-col justify-center">
                    <h1 className="text-lg font-bold text-wrap md:text-xl lg:text-2xl">
                        {productInfo.name}
                    </h1>
                    <p className={"py-3 text-black/50"}>
                        {productInfo.description}
                    </p>
                    <p className={"font-extrabold"}>
                        <span>$</span>
                        <span>{productInfo.price}</span>
                    </p>
                    <p
                        className={
                            "py-3 max-w-[60%] text-black/50 font-semibold"
                        }
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Alias atque dicta fugit illum impedit mollitia
                        nihil non sed sint sit! Commodi,
                    </p>
                    <AddToCartForm data={productInfo} />
                </div>
            </div>
        </section>
    );
};

export default ProductDetailPage;
