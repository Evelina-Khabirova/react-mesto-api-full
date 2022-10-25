import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component, path, ...props
}) => {
  return(
      () => 
        props.loggedIn ? <Component path={path} {...props} /> : <Navigate to="/sign-in" />
  );
}

export default ProtectedRoute;