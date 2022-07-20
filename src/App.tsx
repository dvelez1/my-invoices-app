import React from "react";
import { Navbar } from "./components/Navbar";

import { Home } from "./pages/Home";
import { CustomersPage } from "./pages/CustomersPage";
import { ProductsPage } from "./pages/ProductsPage";
import { InvoicesPage } from "./pages/InvoicesPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomerUpsert } from "./components/Customers/CustomerUpsert";
import { ProductUpsert } from "./components/Products/ProductUpsert";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="context">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomersPage />} />
            <Route path="/customerUpsert" element={<CustomerUpsert />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/productUpsert" element={<ProductUpsert />} />
            <Route path="/invoice" element={<InvoicesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
