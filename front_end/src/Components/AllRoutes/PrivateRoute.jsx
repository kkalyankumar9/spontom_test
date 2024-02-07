import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const location = useLocation();

  return isAuth ? (
    // If authenticated, render the children
    children
  ) : (
    // If not authenticated, navigate to the "/signin" route
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
