import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Product } from "../../models/product";

// Data Context
import { useDataContext } from "../../context/DataContext";

// Import Spinner
import { Loading } from "../../components/shared/Loading";
import { useProductsGet } from "../../hooks/Products/useProductsGet";

export const Products = () => {
  // Add DataContext
  const { productModel, setProductModel } = useDataContext();

  // Get Product and execute Loading Spinner
  const { products, isLoading } = useProductsGet();

  // Properties for paging and Search
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  //#region "Methods"

  // Page Redirection
  const navigate = useNavigate();
  const handleUpsertClick = (productId: Number) => {
    // Send and Object as Parameter
    const product = products.filter((obj) => {
      return obj.ProductId === productId;
    })[0];

    // TODO: Delete
    setProductModel(
      products.filter((obj) => {
        return obj.ProductId === productId;
      })[0]
    );

    navigate("/productUpsert", {
      state: product,
    });
  };

  //#region "Filtering and Pagination"
  const filteredProduct = (): Product[] => {
    if (search.length === 0)
      return products.slice(currentPage, currentPage + 10);

    //Search Input with data
    const filtered = products.filter((prod) =>
      prod.Name.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      products.filter((prod) => prod.Name.includes(search)).length >
      currentPage + 10
    )
      setCurrentPage(currentPage + 10);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  const onSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(target.value.toLowerCase());
  };

  //#endregion "Filtering and Pagination"

  //#endregion "Methods"

  return (
    <>
      <div className="card">
        <h3 className="card-header">Products</h3>
        <div className="card-body">
          <h5 className="card-title">List of Products</h5>
          <hr />

          <input
            className="mb-2 form-control"
            type="text"
            placeholder="Products Search by Name"
            value={search}
            onChange={onSearchChange}
          />

          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => handleUpsertClick(0)}
          >
            Create New Product
          </button>
          <table className="table mt-2">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProduct().map(({ ProductId, Name, Price }) => (
                <tr key={ProductId}>
                  <td>{ProductId}</td>
                  <td>{Name}</td>
                  <td>{Price}</td>
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
              ))}
            </tbody>
          </table>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" onClick={prevPage}>
              Previous
            </button>
            <button className="btn btn-primary" onClick={nextPage}>
              Next
            </button>
          </div>
          {isLoading && <Loading />}
        </div>
      </div>
    </>
  );
};
