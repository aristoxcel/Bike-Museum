import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import ProductDetails from "../pages/ProductDetails";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);
