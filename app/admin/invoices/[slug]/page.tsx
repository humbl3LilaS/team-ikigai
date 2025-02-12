import React from "react";

import InvoiceDetail from "@/features/admin/invoice/components/invoice-detail";

const InvoicePage = async ({params}:{params:Promise<{ id:string }>}) => {
    const {id} = await params;
    
  return (
    <div>
        <InvoiceDetail id={id} />
    </div>
  );
};

export default InvoicePage;