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
      </tr>
    </>
  );
};
