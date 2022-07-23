import React from "react";
import { useInvoicesGet } from "../../hooks/Invoice/useInvoicesGet";

export const Invoices = () => {
  const { isLoading } = useInvoicesGet();
  return (
    <div>
      <p>Invoice</p>
    </div>
  );
};
