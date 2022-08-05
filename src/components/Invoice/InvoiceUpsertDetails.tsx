import React, { useState } from "react";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { useDataContext } from "../../context/DataContext";

export const InvoiceUpsertDetails = (props: any) => {
  const { invoiceDetailsArray, setInvoiceDetailsArray } = useDataContext();

  const isCreateOperation = (InvoiceId: number): boolean => {
    if (InvoiceId && InvoiceId > 0) return true;
    else return false;
  };

  const handleRemoveClick = (id: number) => {
    setInvoiceDetailsArray((current) =>
      current.filter((invDetails) => {
        return invDetails.InvoiceDetailsId != id;
      })
    );
  };

  return (
    <>
      <table className="table table-sm mt-2">
        <thead className="thead-dark">
          <tr>
            <th>Product Name</th>
            <th>Catalog Price</th>
            <th>Transaction Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetailsArray?.map(
            ({
              InvoiceDetailsId,
              InvoiceId,
              ProductId,
              ProductName,
              CatalogPrice,
              Price,
              Quantity,
            }) => (
              <tr key={InvoiceDetailsId}>
                <td>
                  <select
                    className="form-control"
                    aria-label="Floating label select example"
                    onChange={props.handleProductChange}
                    defaultValue={ProductId || ""}
                  >
                    <option value="" disabled>
                      {" "}
                      -- Select a Product --{" "}
                    </option>
                    {props.products.map((prod: any) => (
                      <option key={prod.ProductId} value={prod.ProductId}>
                        ({prod.ProductId}) - {prod.Name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="masterPrice"
                    name="masterPrice"
                    placeholder="Catalog Price"
                    defaultValue={CatalogPrice}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Price"
                    defaultValue={Price}
                    readOnly={isCreateOperation(InvoiceId)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity"
                    defaultValue={Quantity}
                    readOnly={isCreateOperation(InvoiceId)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="total"
                    name="total"
                    placeholder="Total"
                    defaultValue={(Price ?? 0) * (Quantity ?? 0)}
                    readOnly
                  />
                </td>
                <td>
                  <span
                    style={{
                      visibility: !isCreateOperation(InvoiceId)
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    <i
                      title="Delete Customer"
                      className="bi bi-trash cursor"
                      style={{ fontSize: 25 }}
                      onClick={() => handleRemoveClick(InvoiceDetailsId)}
                    ></i>
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};
