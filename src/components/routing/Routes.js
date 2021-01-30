import React from "react";
import { Route, Switch } from "react-router-dom";
import Product from "../Product/Product";
import ProductEdit from "../Admin/Product/ProductEdit";
import ProductCreate from "../Admin/Product/ProductCreate";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../notfound";
import Home from "../Admin/Home";

const Routes = () => {
  return (
    <section>
      <Switch>
        <AuthRoute exact path="/account">
          <Login />
        </AuthRoute>
        <AuthRoute exact path="/account/register">
          <Register />
        </AuthRoute>
        <AdminRoute exact path="/admin">
          <Home />
        </AdminRoute>
        <Route
          exact
          path="/product/:id"
          render={(props) => <Product {...props} />}
        />
        <AdminRoute
          exact
          path="/admin/product/edit/:id"
          render={(props) => <ProductEdit {...props} />}
        />
        <AdminRoute
          exact
          path="/admin/product/create"
          render={(props) => <ProductCreate {...props} />}
        />
        <Route render={(props) => <NotFound {...props} />} />
      </Switch>
    </section>
  );
};

export default Routes;
