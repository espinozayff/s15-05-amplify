import React from "react";
import ReactDOM from "react-dom/client";
import ReactProvider from "./providers/index";
import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactProvider />
  </React.StrictMode>,
);
