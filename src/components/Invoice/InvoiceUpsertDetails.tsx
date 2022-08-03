import React from "react";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { useDataContext } from "../../context/DataContext";

export const InvoiceUpsertDetails = (props:any) => {
    const {
        invoiceDetailsArray,
        setInvoiceDetailsArray,
      } = useDataContext();
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
                  >
                    <option value="Select a Product">
                      {" "}
                      -- Select a Product --{" "}
                    </option>
                    {props.products.map((prod:any) => (
                      <option
                        value={prod.ProductId}
                        selected={prod.ProductId === ProductId ? true : false}
                      >
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
                  <span className="me-md-2 ">
                    <i
                      title="Edit Customer"
                      className="bi bi-pencil-square cursor"
                      style={{ fontSize: 25 }}
                    ></i>
                  </span>
                  <span>
                    <i
                      title="Delete Customer"
                      className="bi bi-trash cursor"
                      style={{ fontSize: 25 }}
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
