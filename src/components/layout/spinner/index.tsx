import React, { Fragment } from "react";
import spinnerGif from "./spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      alt="Loading..."
      src={spinnerGif}
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);

export default Spinner;
