import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import AuthRoute from "./AuthRoute";
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
