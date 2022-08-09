import React, { useEffect, useState } from "react";
// Data Context
import { useDataContext } from "../../context/DataContext";
import { InvoiceDetails } from "../../models/InvoiceDetails";
import { Product } from "../../models/product";
import { InvoiceUpserMaster } from "./InvoiceUpserMaster";

export const InvoiceUpsertDetailsAddToList = (props: any) => {
  // Import DataContext
  const {
    invoiceMasterModel,
    invoiceDetailsArray,
    setInvoiceDetailsArray,
    setInvoiceMasterModel,
  } = useDataContext();

  const [productPrice, setProductPrice] = useState<number | null>(null);

  // When a Item is added to invoiceDetailsArray, proceed to update invoiceMasterModel
  useEffect(() => {
    setInvoiceMasterModel({
      ...invoiceMasterModel,
      TotalAmount: Number(returnTotalAmountFromList()),
    });
  }, [invoiceDetailsArray]);
  
  // Get Total Amount From List
  const returnTotalAmountFromList = () => {
    let totalPrice: number = 0;
    invoiceDetailsArray.forEach(
      (element) => (totalPrice += element.Price * element.Quantity)
    );
    return totalPrice;
  };

  // Add Elements to Array (InvoiceDetails - Only Create Operation
  const handleAddInvoiceDetailsSubmit = (event: any) => {
    event.preventDefault();
    // console.log(event.target.elements.name.value); // from elements property
    // console.log(event.target.name.value); // or directly

    const formData: InvoiceDetails = {
      InvoiceDetailsId: invoiceDetailsArray.length + 1,
      InvoiceId: invoiceMasterModel?.InvoiceId ?? 0,
      ProductId: Number(event.target.productId.value),
      ProductName: props.products.filter((obj: Product) => {
        return obj.ProductId == Number(event.target.productId.value);
      })[0].Name,
      CatalogPrice: Number(event.target.catalogPrice.value),
      Price: Number(event.target.price.value),
      RemovedTransaction: false,
      RemovedDate: null,
      Quantity: Number(event.target.quantity.value),
    };

    //Update Context
    setInvoiceDetailsArray((current) => [...current, formData]);

    clearForm(event);
  };

  const clearForm = (event: any) => {
    event.preventDefault();
    // Reset Form
    event.target.reset();
    setProductPrice(0);
  };

  return (
    <>
      <form
        onSubmit={handleAddInvoiceDetailsSubmit}
        id="add-invoice-details"
        name="add-invoice-details"
      >
        <div className="card mt-2" style={{ width: "100" }}>
          <div className="card-body">
            <label className="fw-bold mb-2">Add detail to the Invoice:</label>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label fw-bold">Product</label>
                <select
                  name="productId"
                  className="form-control"
                  aria-label="Floating label select example"
                  onChange={(e) =>
                    setProductPrice(
                      props.products.filter((obj: any) => {
                        return obj.ProductId == Number(e.target.value);
                      })[0].Price
                    )
                  }
                  defaultValue={""}
                >
                  <option value="" disabled>
                    {" "}
                    -- Select a Product --{" "}
                  </option>
                  {props.products.map((prod: any) => (
                    <option key={prod.ProductId} value={prod.ProductId}>
                      {prod.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold">Catalog Price</label>
                <input
                  type="number"
                  step=".01"
                  className="form-control"
                  name="catalogPrice"
                  placeholder="Catalog Price"
                  value={productPrice ?? 0}
                  readOnly
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold">Price</label>
                <input
                  type="number"
                  step=".01"
                  className="form-control"
                  name="price"
                  placeholder="Price"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  placeholder="Quantity"
                />
              </div>
              <div className="col-md-3">
                <div className="d-grid gap-2 d-md-flex mt-2">
                  <label className="form-label fw-bold"></label>
                  <button className="btn btn-primary btn-md mt-4" type="submit">
                    Add
                  </button>
                  <button className="btn btn-primary btn-md mt-4">Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
