import React from "react";
import { NavLink } from "react-router-dom";
import cornerStyle from "./Corner.module.css";

function ForecastCorner(props) {
  return (
    <NavLink to="/forecast" state={{ data: props.data, date: props.date }}>
      <img src="/umbrella.ico" className={cornerStyle.botRight} />
    </NavLink>
  );
}

export default ForecastCorner;
