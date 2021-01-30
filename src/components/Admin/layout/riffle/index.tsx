import React, { Fragment } from "react";
import riffleGif from "./riffle.gif";

const Riffle = () => (
  <Fragment>
    <img
      alt="Loading..."
      src={riffleGif}
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);

export default Riffle;
