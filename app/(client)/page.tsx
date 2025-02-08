import Description from "@/components/homeProduct/Description";
import Hero from "@/components/homeProduct/Hero";
import ProductList from "@/components/homeProduct/ProductList";
import Header from "@/components/share/client/header";

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
