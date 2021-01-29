import React from "react";
import { Route, Switch } from "react-router-dom";
import Product from "../Product/Product";
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
        <Route
          exact
          path="/product/:id"
          render={(props) => <Product {...props} />}
        />
        <Route render={(props) => <NotFound {...props} />} />
      </Switch>
    </section>
  );
};

export default Routes;
