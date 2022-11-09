import { useState } from "react";
import { InvoiceDetails } from "../../interfaces/InvoiceDetails";

import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export const InvoicesDetails = (props: any) => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails[]>(
    props.invoiceDetails
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setOpen(!open)}
          aria-controls="collapse-invoice-details"
          aria-expanded={open}
        >
          Show Invoice Details
        </Button>
      </div>
      <div className="overflow-auto">
        <Collapse in={open}>
          <div id="collapse-invoice-details">
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
          </div>
        </Collapse>
      </div>
    </>
  );
};
