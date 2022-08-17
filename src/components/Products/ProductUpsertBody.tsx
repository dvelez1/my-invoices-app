import React from "react";

export const ProductUpsertBody = (props:any) => {
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="Name"
            placeholder="Name"
            // defaultValue={props.product?.Name}
            value = {props.product.Name}
            onChange={props.handleChange}
          />
          <p className="text-danger"> {props.formErrors.Name}</p>
        </div>
        <div className="col-md-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="Price"
            placeholder="Price"
            step=".01"
            // defaultValue={props.product?.Price}
            value = {props.product.Price}
            onChange={props.handleChange}
          />
          <p className="text-danger"> {props.formErrors.Price}</p>
        </div>
      </div>
    </>
  );
};
