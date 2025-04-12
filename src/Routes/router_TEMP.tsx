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
// import AdminProtectedLayout from "../components/ProtectedLayouts/AdminProtectedLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import UserProtectedLayout from "../components/ProtectedLayouts/UserProtectedLayout";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import ViewUserOrderHistory from "../pages/Dashboard/ViewUserOrderHistory";

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
        path: "/products/orderForm/:id",
        element: <OrderForm />,
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
    element: (
      // <AdminProtectedLayout>
        <Dashboard />
      //  </AdminProtectedLayout> 
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      
    ],
  },
  {
    path: "/user/dashboard",
    element: (
      // <UserProtectedLayout>
        <Dashboard />
      // </UserProtectedLayout>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "view-order-history",
        element: <ViewUserOrderHistory />,
      },
    ],
  },
]);
