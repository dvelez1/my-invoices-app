import React from "react";
import { Navbar } from "./components/Navbar";

import { Home } from "./pages/Home";
import { CustomersPage } from "./pages/CustomersPage";
import { ProductsPage } from "./pages/ProductsPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="context">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomersPage />} />
            <Route path="/product" element={<ProductsPage />} />
          </Routes>
  
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
