import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = true; 

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/admin" />}
    />
  );
};

export default ProtectedRoute;
