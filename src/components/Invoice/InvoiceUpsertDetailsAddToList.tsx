import React from "react";

export const InvoiceUpsertDetailsAddToList = (props: any) => {
  return (
    <>
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
                  props.setProductPrice(
                    props.products.filter((obj: any) => {
                      return obj.ProductId == Number(e.target.value);
                    })[0].Price
                  )
                }
                defaultValue = {""}
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
                value={props.productPrice ?? 0}
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
    </>
  );
};
