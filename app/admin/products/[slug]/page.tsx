import Image from "next/image";
import { notFound } from "next/navigation";

import { getProductById } from "@/actions/get-product-by-id";
import AddVariantDialog from "@/features/admin/products/components/add-variant-dialog";
import ColorVariants from "@/features/admin/products/components/color-variants";
import RestockDialog from "@/features/admin/products/components/restock-dialog";
import UpdateProductSheet from "@/features/admin/products/components/update-product-sheet";

const ProductDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const product = await getProductById(slug);
    if (!product) {
        return notFound();
    }
    return (
        <section className={"p-10"}>
            <div className={"grid grid-cols-2 gap-x-6 gap-y-8"}>
                <div>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={350}
                        height={350}
                        className={"ml-auto size-[350px]"}
                    />
                </div>
                <div className={"pl-4 py-6"}>
                    <div className={"flex items-center gap-x-4"}>
                        <h2 className={"text-lg font-bold"}>{product.name}</h2>
                        <UpdateProductSheet data={product} />
                    </div>
                    <p className={"mt-4"}>
                        <span className={"font-semibold text-black/60"}>
                            Category:
                        </span>
                        <span className={"ml-2 font-bold"}>
                            {product.category}
                        </span>
                    </p>
                    <p className={"mt-4"}>
                        <span className={"font-semibold text-black/60"}>
                            Price:
                        </span>
                        <span className={"ml-2 font-bold"}>
                            ${product.price}
                        </span>
                    </p>
                    <ColorVariants variants={product.variants} />
                    <div className={"mt-4 flex items-center gap-x-4"}>
                        <RestockDialog variants={product.variants} />
                        <AddVariantDialog detailId={product.id} />
                    </div>
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
                        {product.detail}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailPage;
