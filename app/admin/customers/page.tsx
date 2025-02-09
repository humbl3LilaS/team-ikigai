import { D_Users } from "@/dummy";
import CustomersTable from "@/features/admin/customer/components/customers-table";


export default function CustomerPage() {
    return <section className="text-foreground">
        <CustomersTable columns={D_Users} data={D_Users} />
    </section>
}
