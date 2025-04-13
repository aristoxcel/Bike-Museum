import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAppSelector((state) => state.auth);

  // If user is not logged in, redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // If the user's role is not allowed for this route, redirect them based on their role
  if (!allowedRoles.includes(user.role)) {
    // Redirect admin to their dashboard if they try to access user routes
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // Redirect user to their dashboard if they try to access admin routes
    if (user.role === 'user') {
      return <Navigate to="/user/dashboard" replace />;
    }
    // For any other case, redirect to the home page
    return <Navigate to="/" replace />;
  }

  // If user has an allowed role, render the child route (Outlet)
  return <Outlet />;
};

export default PrivateRoute;
