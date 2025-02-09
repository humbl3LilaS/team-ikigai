import Description from "@/components/homeProduct/Description";
import Hero from "@/components/homeProduct/Hero";
import ProductList from "@/features/client/product/components/product-list";

export default async function Home() {
    return (
        <section className="w-[100vw] mt-16 h-full">
            <div className="mt-20">
                <Hero />
                <ProductList />
                <Description />
            </div>
        </section>
    );
}
