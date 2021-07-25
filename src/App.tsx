import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import "./App.scss";
import AuthProvider from "./providers/AuthProvider";
import Home from "./containers/Home";
import Login from "./containers/Login";
import PrivateRoute from "./PrivateRoute";

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
