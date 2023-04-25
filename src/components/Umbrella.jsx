import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Umbrella.module.css";
import CircularProgress from "@mui/material/CircularProgress";

function Umbrella(props) {
  function displayImage() {
    if (props.loading) {
      return <CircularProgress size="70vh" />;
    } else if (props.outdated) {
      return <img src="/umbrella_error.png" alt="Outdated dataset" />;
    } else {
      if (props.raining) {
        return <img src="/umbrella_open.png" />;
      } else {
        return <img src="/umbrella_closed.png" />;
      }
    }
  }

  function displayMessage() {
    if (props.loading) {
      return;
    } else if (props.outdated) {
      return (
        <>
          Problems with database...
          <br />
          Bring your umbrella just in case!
        </>
      );
    } else {
      if (props.raining) {
        return "Bring your umbrella along!";
      } else {
        return "Leave your umbrella behind!";
      }
    }
  }

  return (
    <div className={`${styles.centered}`}>
      <NavLink
        to="/forecast"
        state={{ data: props.data, date: props.date, coords: props.coords }}
      >
        {displayImage()}
      </NavLink>
      <div>{displayMessage()}</div>
    </div>
  );
}

export default Umbrella;
