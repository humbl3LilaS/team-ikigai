import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { adminSideBarItems } from "@/constants/ui-constants";
import ReportTable from "@/features/admin/reports/components/reports-table";

export default async function ReportPage() {
    const role = (await auth())?.user.role;
    const acceptRoles = adminSideBarItems.find(({ title }) => title == "Reports");
    const isValidate = acceptRoles?.role.includes(role!);
    if (!isValidate) {
        notFound();
    }

    // const res = await getSaleReports();

    return (
        <section className="">
            PAGE
            <ReportTable />
        </section>
    );
}
