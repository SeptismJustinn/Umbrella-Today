import React from "react";

function Umbrella(props) {
  return (
    <div className="container">
      <img src="/umbrella_closed.png" alt="" />
      <div className="row">
        {raining ? "Bring your umbrella along!" : "Leave your umbrella behind!"}
      </div>
    </div>
  );
}

export default Umbrella;
