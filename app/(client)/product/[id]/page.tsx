import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductById } from "@/actions/get-product-by-id";
import AddToCartForm from "@/features/client/cart/components/add-to-cart-form";
import ProductSlider from "@/features/client/product/components/product-slider";

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
    const {id} = await params;
    const product = await (getProductById(id));
    return{
        title:product?.brand,
        description:"product description",
        openGraph:{
            title:product?.name,
            description:product?.description,
            images:[product?.imageUrl as string],
        },
    };
}

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
            <div className={"w-full grid grid-cols-1 gap-y-8 md:grid-cols-2 "}>
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
                    <AddToCartForm data={productInfo} />
                </div>
                <div
                    className={
                        "p-6 rounded-2xl border border-black/80 md:p-10 md:col-span-2"
                    }
                >
                    <h3 className={"mb-3 text-lg font-bold md:text-xl"}>
                        About This Product
                    </h3>
                    <p className={"font-semibold text-black/60"}>
                        {productInfo.detail}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailPage;
