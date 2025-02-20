import { BriefcaseBusinessIcon, MapPin, PhoneCallIcon } from "lucide-react";

import { auth } from "@/auth";
import { getCategoriesByWarehouseId } from "@/dashboard/actions";

import { InventoryChart } from "./dashboard-inventory-chart";

export default async function WarehouseDashboard() {
  const session = await auth();
  const res = await getCategoriesByWarehouseId(session?.user.id || "");
  // console.log(res);
  return (
    <section className="px-3 max-w-screen-lg">
      <div className="mb-3">
        <h1 className="admin-header">{res.warehouseName} Warehouse</h1>
        <p className="text-muted-foreground font-medium"><BriefcaseBusinessIcon className="inline size-4 mr-1" />{res.warehouseManagerName}</p>
        <p className="text-sm text-muted-foreground my-1"><MapPin className="inline size-4 mr-1" />{res.location}</p>
        <p className="text-sm text-muted-foreground"><PhoneCallIcon className="inline size-4 mr-1" />{res.phone}</p>
      </div>
      <InventoryChart warehouseName={res.warehouseName!} />
    </section>
  );
}
