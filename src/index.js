import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// bootstrap CSS
import "./main.css"
import { UserProvider } from "./contexts/UserProvider";

import { 
  createBrowserRouter,
  RouterProvider, 
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
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
);
