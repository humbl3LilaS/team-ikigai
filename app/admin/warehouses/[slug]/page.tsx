import WareHouseDetail from "@/features/admin/warehouses/components/warehouseDetail";

const Index = async ({params}:{params:Promise<{slug:string}>}) => {
    const {slug} = await params;

  return (
    <section>
        <WareHouseDetail id={slug} />
    </section>
  );
};

export default Index;