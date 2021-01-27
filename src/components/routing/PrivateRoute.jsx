import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  children,
  auth: { isAuthenticated, loading },
  ...rest
}) => {

  return (
    <Route {...rest}>
      {isAuthenticated && !loading ? (
        children
      ) : (
        <Redirect to='/login' />
      )}
    </Route>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(PrivateRoute);
