import React from "react";

export const InvoicesDetailsRows = (props: any) => {
  return (
    <>
      <tr>
        <td>{props.ProductName}</td>
        <td>
          {"$ "} {props.CatalogPrice ?? 0}
        </td>
        <td>
          {"$ "} {props.Price ?? 0}
        </td>
        <td>{props.Quantity ?? 0}</td>
        <td>
          {"$ "}
          {(props.Quantity ?? 0) * (props.Price ?? 0)}
        </td>
        <td>
          <span className="me-md-2 ">
            <i
              title="Edit Invoice Details"
              className="bi bi-pencil-square cursor"
              style={{ fontSize: 18 }}
            ></i>
          </span>
          <span>
            <i
              title="Delete Invoice Details"
              className="bi bi-trash cursor"
              style={{ fontSize: 18 }}
            ></i>
          </span>
        </td>
      </tr>
    </>
  );
};
