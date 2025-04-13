import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import ProductDetails from "../pages/ProductDetails";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import OrderForm from "../pages/OrderForm/OrderForm";
import AboutUs from "../pages/AboutUs";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import ViewUserOrderHistory from "../pages/Dashboard/ViewUserOrderHistory";
import PaymentSuccess from "../pages/OrderForm/PaymentSuccess";
import PaymentFail from "../pages/OrderForm/PaymentFail";
import PaymentCancel from "../pages/OrderForm/PaymentCancel";
import PrivateRoute from "./PrivateRoute";
import CreateProductForm from "../pages/admin/CreateProductForm";

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
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/products/orderForm/:id",
        element: <PrivateRoute allowedRoles={["user"]} />,
        children: [
          {
            index: true,
            element: <OrderForm />,
          },
        ],
      },
      {
        path: "/products/success-payment/:tran_Id",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/products/failed-payment/:tran_Id",
        element: <PaymentFail></PaymentFail>,
      },
      {
        path: "/products/cancel-payment/:tran_Id",
        element: <PaymentCancel></PaymentCancel>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <PrivateRoute allowedRoles={["admin"]} />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "/admin/dashboard/products/add",
        element: <CreateProductForm />,
      },
    ],
  },
  {
    path: "/user/dashboard",
    element: <PrivateRoute allowedRoles={["user"]} />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "/user/dashboard/edit-orders",
        element: <ViewUserOrderHistory />,
      },
    ],
  },
]);
