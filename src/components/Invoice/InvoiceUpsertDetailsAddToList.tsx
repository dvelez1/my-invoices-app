import React, { useEffect, useState } from "react";
// Data Context
import { useDataContext } from "../../context/DataContext";
import { addInvoiceDetailsValidation } from "../../hooks/Invoice/addInvoiceDetailsValidation";
import { InvoiceDetails } from "../../interfaces/InvoiceDetails";
import { Product } from "../../interfaces/product";

export const InvoiceUpsertDetailsAddToList = (props: any) => {
  // Import DataContext
  const {
    invoiceMasterModel,
    invoiceDetailsArray,
    setInvoiceDetailsArray,
    setInvoiceMasterModel,
  } = useDataContext();

  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const initialFormData: InvoiceDetails = {
    InvoiceDetailsId: 0,
    InvoiceId: 0,
    ProductId: 0,
    ProductName: "",
    CatalogPrice: 0,
    Price: 0,
    RemovedTransaction: false,
    RemovedDate: null,
    Quantity: 0,
  };
  const [invoiceDetails, setInvoiceDetails] =
    useState<InvoiceDetails>(initialFormData);

  // When a Item is added to invoiceDetailsArray, proceed to update invoiceMasterModel
  useEffect(() => {
    setInvoiceMasterModel({
      ...invoiceMasterModel,
      TotalAmount: Number(returnTotalAmountFromList()),
    });
  }, [invoiceDetailsArray]);

  // Used to add records in the InvoiceDetails (submit Event)
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setInvoiceDetailsArray((current) => [...current, invoiceDetails]);
      clearForm();
    }

    setIsSubmit(false);
  }, [formErrors]);

  // Run Validation always invoiceDetails change
  useEffect(() => {
    setFormErrors(addInvoiceDetailsValidation(invoiceDetails));
  }, [invoiceDetails]);

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
    setIsSubmit(true);
    const formData: InvoiceDetails = {
      InvoiceDetailsId: invoiceDetailsArray.length + 1,
      InvoiceId: invoiceMasterModel?.InvoiceId ?? 0,
      ProductId: Number(event.target.ProductId.value),
      ProductName:
        event.target.ProductId.value === ""
          ? ""
          : props.products.filter((obj: Product) => {
              return obj.ProductId == Number(event.target.ProductId.value);
            })[0].Name,
      CatalogPrice: Number(event.target.CatalogPrice.value),
      Price: Number(event.target.Price.value),
      RemovedTransaction: false,
      RemovedDate: null,
      Quantity: Number(event.target.Quantity.value),
    };

    setInvoiceDetails(formData);
    setFormErrors(addInvoiceDetailsValidation(formData));
  };

  const handleChange = (e: any) => {
    setInvoiceDetails({
      ...invoiceDetails,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });

    // Update Catalog Price
    if (e.target.name == "ProductId") {
      setProductPrice(
        props.products.filter((obj: any) => {
          return obj.ProductId == Number(e.target.value);
        })[0].Price
      );
    }
  };

  const clearForm = () => {
    setInvoiceDetails(initialFormData);
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
                  name="ProductId"
                  className="form-control"
                  aria-label="Floating label select example"
                  onChange={handleChange}
                  value={invoiceDetails?.ProductId || ""}
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
                <p className="text-danger"> {formErrors.ProductId}</p>
              </div>
              
              <div className="col-md-2">
                <label className="form-label fw-bold">Catalog Price</label>
                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    step=".01"
                    className="form-control"
                    name="CatalogPrice"
                    placeholder="Catalog Price"
                    value={productPrice?.toFixed(2) ?? 0}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-md-2">
                <label className="form-label fw-bold">Price</label>
                <div className="input-group mb-3">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    step=".01"
                    className="form-control"
                    name="Price"
                    placeholder="Price"
                    onChange={handleChange}
                    value={invoiceDetails?.Price}
                  />
                  <p className="text-danger"> {formErrors.Price}</p>
                </div>
              </div>

              <div className="col-md-2">
                <label className="form-label fw-bold">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="Quantity"
                  placeholder="Quantity"
                  value={invoiceDetails?.Quantity}
                  onChange={handleChange}
                />
                <p className="text-danger"> {formErrors.Quantity}</p>
              </div>

              <div className="col-md-3">
                <div className="d-grid gap-2 d-md-flex mt-2">
                  <label className="form-label fw-bold"></label>
                  <button className="btn btn-primary btn-md mt-4" type="submit">
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-md mt-4"
                    onClick={clearForm}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
