
import Category from "@/components/backupCategory/category";
import Footer from "@/components/footer/Footer";
import Description from "@/components/homeProduct/Description";
import Hero from "@/components/homeProduct/Hero";
import ProductList from "@/features/client/product/components/product-list";

export default async function Home() {
    return (
        <section className="p-4 sm:p-6">
            <div className="mt-6">
                <Hero />
                {/* <HomeCategory/> */}
                <Category/>
                <ProductList />
                <Description />
            </div>
            <Footer />
        </section>
    );
}
