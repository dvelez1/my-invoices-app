// Boostrap  5 --> npm i bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Boostrap Icons --> npm i bootstrap-icons
import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Context Provider
import DataProvider from "./context/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <DataProvider>
    <div className="container-fluid">
      <App />
    </div>
  </DataProvider>
);
