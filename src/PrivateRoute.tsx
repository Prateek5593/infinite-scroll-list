import React from "react";
import { Route, Redirect } from "react-router";
import { RouteProps } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

interface IProps extends RouteProps {

}

const PrivateRoute: React.FC<IProps> = ({ children, ...rest }) => {
  const {
    state: { isAuthenticated },
  } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
