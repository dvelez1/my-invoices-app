import React from "react";
import { useInvoicesGet } from "../../hooks/Invoice/useInvoicesGet";

export const Invoices = () => {
  const { isLoading, invoiceMaster, invoiceDetails, invoicePayments } =
    useInvoicesGet();

    console.log("invoiceMaster",invoiceMaster)
    console.log("invoiceDetails",invoiceDetails)
    console.log("invoicePayments",invoicePayments)
  return (
    <div>
      <p>Invoice</p>
    </div>
  );
};
