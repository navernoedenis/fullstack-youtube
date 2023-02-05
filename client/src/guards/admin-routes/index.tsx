import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "context/auth";
import { isAdminRole } from "helpers/roles";

interface AdminRoutesProps {
  children: JSX.Element;
}

function AdminRoutes({ children }: AdminRoutesProps) {
  const { me } = useAuth();
  const isAdmin = isAdminRole(me?.roles || []);

  if (!me || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoutes;
