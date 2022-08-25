import React, { useState } from "react";
import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

export const InvoicesDetails = (props: any) => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails[]>(
    props.invoiceDetails
  );

  return (
    <>
      <table className="table table-sm">
        <thead className="thead-dark">
          <tr>
            <th>Product Name</th>
            <th>Catalog Price</th>
            <th>Transaction Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {invoiceDetails
            .filter((obj: any) => obj.InvoiceId === props.InvoiceId)
            .map(
              ({
                ProductName,
                CatalogPrice,
                Price,
                Quantity,
                InvoiceDetailsId,
              }) => (
                <tr key={InvoiceDetailsId}>
                  <td>{ProductName}</td>
                  <td>
                    {"$ "} {CatalogPrice ? CatalogPrice.toFixed(2) : 0}
                  </td>
                  <td>
                    {"$ "} {Price ? Price.toFixed(2) : 0}
                  </td>
                  <td>{Quantity ?? 0}</td>
                  <td>
                    {"$ "}
                    {((Quantity ?? 0) * (Price ?? 0)).toFixed(2)}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  );
};
