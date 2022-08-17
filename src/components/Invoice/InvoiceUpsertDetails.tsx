import { useState } from "react";
import { useDataContext } from "../../context/DataContext";

export const InvoiceUpsertDetails = (props: any) => {
  const { invoiceDetailsArray, setInvoiceDetailsArray } = useDataContext();
  const [product, setProduct] = useState("");
  const isCreateOperation = (InvoiceId: number): boolean => {
    if (InvoiceId && InvoiceId > 0) return true;
    else return false;
  };

  const calculateTotal = (price: number, quantity: number): number => {
    return (price ?? 0) * (quantity ?? 0);
  };

  //#region OnChange Methods
  const handleProductChange = (e: any, invoiceDetailsId: number) => {
    setProduct(e.target.value);

    setInvoiceDetailsArray((current) =>
      current.map((obj) => {
        if (obj.InvoiceDetailsId === invoiceDetailsId) {
          return {
            ...obj,
            ProductId: e.target.value,
            CatalogPrice: props.products.filter((obj: any) => {
              return obj.ProductId == Number(e.target.value);
            })[0].Price,
          };
        }
        return obj;
      })
    );
  };

  const handleCatPriceChange = (e: any, invoiceDetailsId: number) => {
    setInvoiceDetailsArray((current) =>
      current.map((obj) => {
        if (obj.InvoiceDetailsId === invoiceDetailsId) {
          return { ...obj, CatalogPrice: Number(e.target.value) };
        }
        return obj;
      })
    );
  };

  const handlePriceChange = (e: any, invoiceDetailsId: number) => {
    setInvoiceDetailsArray((current) =>
      current.map((obj) => {
        if (obj.InvoiceDetailsId === invoiceDetailsId) {
          return { ...obj, Price: Number(e.target.value) };
        }
        return obj;
      })
    );
  };

  const handleQuantityChange = (e: any, invoiceDetailsId: number) => {
    setInvoiceDetailsArray((current) =>
      current.map((obj) => {
        if (obj.InvoiceDetailsId === invoiceDetailsId) {
          return { ...obj, Quantity: Number(e.target.value) };
        }
        return obj;
      })
    );
  };

  const handleRemoveClick = (id: number) => {
    setInvoiceDetailsArray((current) =>
      current.filter((invDetails) => {
        return invDetails.InvoiceDetailsId != id;
      })
    );
  };
  //#endregion

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
                    onChange={(e) => {
                      handleProductChange(e, InvoiceDetailsId);
                    }}
                    value={ProductId || ""}
                  >
                    <option value="" disabled>
                      {" "}
                      -- Select a Product --{" "}
                    </option>
                    {props.products.map((prod: any) => (
                      <option
                        key={prod.ProductId}
                        value={prod.ProductId}
                        disabled={isCreateOperation(InvoiceId)}
                      >
                        ({prod.ProductId}) - {prod.Name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="masterPrice"
                      name="masterPrice"
                      placeholder="Catalog Price"
                      value={CatalogPrice.toFixed(2)}
                      onChange={(e) => {
                        handleCatPriceChange(e, InvoiceDetailsId);
                      }}
                      readOnly
                    />
                  </div>
                </td>
                <td>
                  <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Price"
                      defaultValue={Price.toFixed(2)}
                      onChange={(e) => {
                        handlePriceChange(e, InvoiceDetailsId);
                      }}
                      readOnly={isCreateOperation(InvoiceId)}
                    />
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity"
                    defaultValue={Quantity}
                    onChange={(e) => {
                      handleQuantityChange(e, InvoiceDetailsId);
                    }}
                    readOnly={isCreateOperation(InvoiceId)}
                  />
                </td>
                <td>
                  <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="total"
                      name="total"
                      placeholder="Total"
                      value={calculateTotal(Price, Quantity).toFixed(2)}
                      readOnly
                    />
                  </div>
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
