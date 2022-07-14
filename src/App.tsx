import React from "react";
import { Navbar } from "./components/Navbar";

import { Home } from "./pages/Home";
import { Customers } from "./pages/Customers";
import { Products } from "./pages/Products";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/product" element={<Products />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
