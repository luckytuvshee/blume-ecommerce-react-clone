import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../notfound";

const Routes = () => {
  return (
    <section>
      <Switch>
        <AuthRoute exact path="/account">
          <Login />
        </AuthRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
};

export default Routes;
