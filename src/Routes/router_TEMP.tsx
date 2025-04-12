import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import ProductDetails from "../pages/ProductDetails";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import OrderForm from "../pages/OrderForm/OrderForm";

import AboutUs from "../pages/AboutUs"
import PaymentSuccess from "../pages/OrderForm/PaymentSuccess";
import PaymentFail from "../pages/OrderForm/PaymentFail";
import PaymentCancel from "../pages/OrderForm/PaymentCancel";

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
        element: <ProductDetails/>,
      },
      {
        path: "/about-us",
        element: <AboutUs/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products/orderForm/:id",
        element: <OrderForm />,
      },
      {
        path: "/payment/success/:tran_id",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/fail/:tran_id",
        element: <PaymentFail />,
      },
      {
        path: "/api/payment/cancel/:id",
        element: <PaymentCancel />,
      },
    ],
  },
]);
