import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface Props {
  auth: any;
}

const UnauthenticatedRoute: React.FC<Props> = ({
  children,
  auth: { isAuthenticated },
  ...rest
}) => {
  return (
    <Route {...rest}>{!isAuthenticated ? children : <Redirect to="/" />}</Route>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(UnauthenticatedRoute);
