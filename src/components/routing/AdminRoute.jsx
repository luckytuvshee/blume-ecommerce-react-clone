import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AdminRoute = ({
  children,
  auth: { user, isAuthenticated, loading },
  ...rest
}) => {

  return !loading && (
    <Route {...rest}>
      {isAuthenticated ? user.is_admin ? children : <Redirect to='/' /> : (
        <Redirect to='/account' />
      )}
    </Route>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AdminRoute);
