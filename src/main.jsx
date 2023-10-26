import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import AuthProvider from "./Provider/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className="max-w-5xl mx-auto">
        <AuthProvider>
          {" "}
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </div>
    </HelmetProvider>
  </React.StrictMode>
);
