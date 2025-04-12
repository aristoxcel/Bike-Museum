import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


interface UserProtectedLayoutProps {
  children: ReactNode; 
}

const UserProtectedLayout = ({ children }: UserProtectedLayoutProps) => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  if (!user || user.role !== "user") {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; 
};

export default UserProtectedLayout;
