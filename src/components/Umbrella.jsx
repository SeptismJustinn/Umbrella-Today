import React from "react";
import { NavLink } from "react-router-dom";

function Umbrella(props) {
  return (
    <div className="container">
      <NavLink to="/forecast" state={{ data: props.data, date: props.date }}>
        {props.raining ? (
          <img src="/umbrella_open.png" />
        ) : (
          <img src="/umbrella_closed.png" alt="" />
        )}
      </NavLink>
      <div className="row">
        {props.raining
          ? "Bring your umbrella along!"
          : "Leave your umbrella behind!"}
      </div>
    </div>
  );
}

export default Umbrella;
