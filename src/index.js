import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// bootstrap CSS
import "./main.css"

import { 
  createBrowserRouter,
  RouterProvider, 
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
