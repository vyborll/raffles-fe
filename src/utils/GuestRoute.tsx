import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface GuestRouteProps {
  path: RouteProps['path'];
  component: React.ElementType;
  isAuthenticated: boolean;
  exact?: boolean;
}

const GuestRoute: React.FC<GuestRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (!isAuthenticated ? <Component {...props} /> : <Redirect to="/raffles" />)}
  />
);

export default GuestRoute;
