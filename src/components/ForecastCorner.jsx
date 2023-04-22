import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ForecastCorner.module.css";

function ForecastCorner(props) {
  return (
    <NavLink to="/forecast" state={{ data: props.data, date: props.date }}>
      <img src="/umbrella.ico" className={styles.topRight} />
    </NavLink>
  );
}

export default ForecastCorner;
