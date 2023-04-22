import React from "react";

function HourlyForecast(props) {
  return (
    <div className="row">
      <div className="col-md-1">
        {props.time < 12 ? props.time + "AM" : (props.time % 12) + "PM"}
      </div>
      <div className="col-md-3">{props.forecast}</div>
      <div className="col-md-2">{props.prec}</div>
      <div className="col-md-2">
        {props.temp}
        <span>&#8451;</span>
      </div>
      <div className="col-md-2">{props.humidity}</div>
      <div className="col-md-2">{props.cloudcover}</div>
    </div>
  );
}

export default HourlyForecast;
