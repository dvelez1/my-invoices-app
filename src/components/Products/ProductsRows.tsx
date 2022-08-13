import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product";

export const ProductsRows = ({
  ProductId,
  Name,
  Price,
  handleUpsertClick,
}: any) => {
  return (
    <tr>
      <td>{ProductId}</td>
      <td>{Name}</td>
      <td>{Price.toFixed(2)}</td>
      <td>
        <span className="me-md-2 ">
          <i
            title="Edit Product"
            className="bi bi-pencil-square cursor"
            style={{ fontSize: 25 }}
            onClick={() => handleUpsertClick(ProductId)}
          ></i>
        </span>
      </td>
    </tr>
  );
};
