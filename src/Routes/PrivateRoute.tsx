
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
