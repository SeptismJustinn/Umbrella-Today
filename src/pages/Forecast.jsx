import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function Forecast() {
  const location = useLocation();
  const linkProps = location.state;
  return (
    <>
      {!linkProps && <Navigate replace to="/" />}
      <div>{JSON.stringify(linkProps.data)}</div>;
    </>
  );
}

export default Forecast;
