import React from "react";
import { NavLink } from "react-router-dom";
import cornerStyle from "./Corner.module.css";

function ForecastCorner(props) {
  return (
    <NavLink to="/forecast" state={{ data: props.data, date: props.date }}>
      <div className={`${cornerStyle.botRight} ${cornerStyle.click}`}>
        Detailed Forecast
      </div>
    </NavLink>
  );
}

export default ForecastCorner;
