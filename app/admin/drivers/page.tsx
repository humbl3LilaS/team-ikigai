import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import DriverTable from "@/features/admin/driver/components/driver-table";

export default async function DriverPage() {
    const role = (await auth())?.user.role;
    const acceptRoles = adminSideBarItems.find(({ title }) => title == "Drivers");
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }

    return (
        <section className={"flex-1 p-6"}>
            <h2 className={"mb-4 font-bold text-xl"}>Driver Table</h2>
            <DriverTable />
        </section>
    );
}
