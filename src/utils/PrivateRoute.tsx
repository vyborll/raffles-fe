import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  path: RouteProps['path'];
  component: React.ElementType;
  isAuthenticated: boolean;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={'/'} />)}
  />
);

export default PrivateRoute;
