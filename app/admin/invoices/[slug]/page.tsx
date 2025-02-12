import React from "react";

import InvoiceDetail from "@/features/admin/invoices/components/invoice-detail";

const InvoicePage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    return (
        <section>
            <InvoiceDetail id={slug} />
        </section>
    );
};

export default InvoicePage;
