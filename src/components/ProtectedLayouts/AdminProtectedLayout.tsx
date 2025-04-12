import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";



interface AdminProtectedLayoutProps {
  children: ReactNode; 
}

const AdminProtectedLayout = ({ children }: AdminProtectedLayoutProps) => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  if (!user || user.role !== "admin") {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; 
};

export default AdminProtectedLayout;
