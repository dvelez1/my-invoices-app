import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product";
// Import Spinner
import { Loading } from "../../components/shared/Loading";

import { useProducts } from "../../hooks/Products/useProducts";
import { ProductsRows } from "../Products/ProductsRows";
// Toast
import { PaginationComponent } from "../shared/PaginationComponent";

export const Products = () => {
  // Get Product and execute Loading Spinner
  const { products, isLoading, producApi } = useProducts();

  // Properties for paging and Search
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    producApi.getProducts();
  }, []);

  //#region "Methods"
  // Page Redirection
  const navigate = useNavigate();
  // Note: The Implementation is sending an Object as Parameter on the Navigate Instruction
  const handleUpsertClick = (productId: Number) => {
    // Define a Default Implementation if the Model is Null
    const productDefaultInitialization: Product = {
      ProductId: 0,
      Name: "",
      Price: 0,
      StartDate: new Date(),
      EndDate: null,
    };

    // Retrieve the object from Products based on ProductId
    let product = products.filter((obj) => {
      return obj.ProductId === productId;
    })[0];

    navigate("/productUpsert", {
      state: product ?? productDefaultInitialization,
    });
  };

  //#region "Filtering and Pagination"
  const filteredDataSource = (): Product[] => {
    if (search.length === 0)
      return products.slice(currentPage, currentPage + 10);

    //Search Input with data
    const filtered = products.filter((prod) =>
      prod.Name.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
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
          <div className="overflow-auto">
            <table className="table table-sm mt-2">
              <thead className="">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {/* Row list implementation */}
                {filteredDataSource().map(({ ProductId, Name, Price }) => (
                  <ProductsRows
                    key={ProductId}
                    ProductId={ProductId}
                    Name={Name}
                    Price={Price}
                    handleUpsertClick={handleUpsertClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <PaginationComponent
            currentPage={currentPage}
            search={search}
            dataSource={products}
            filterValueName="Name"
            setCurrentPage={setCurrentPage}
          />
          {isLoading && <Loading />}
        </div>
      </div>
    </>
  );
};
