import React from "react";
import { NavLink } from "react-router-dom";

function Umbrella(props) {
  function displayImage() {
    if (props.outdated) {
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
    if (props.outdated) {
      return "Problems with database... Bring your umbrella just in case!";
    } else {
      if (props.raining) {
        return "Bring your umbrella along!";
      } else {
        return "Leave your umbrella behind!";
      }
    }
  }

  return (
    <div className="container">
      <NavLink to="/forecast" state={{ data: props.data, date: props.date }}>
        {displayImage()}
      </NavLink>
      <div className="row">{displayMessage()}</div>
    </div>
  );
}

export default Umbrella;
