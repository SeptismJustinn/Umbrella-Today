import React from "react";
import styles from "./HourlyForecast.module.css";

function HourlyAstronomy(props) {
  return (
    <div
      className={`row ${
        props.thirdDay ? styles.third_day : props.nextDay ? styles.next_day : ""
      }`}
    >
      <div className="col-md-1">
        {props.time < 12
          ? (props.time || 12) + "AM"
          : (props.time % 12 || 12) + "PM"}
      </div>
      <div className="col-md-2">{props.prec}</div>
      <div className="col-md-2">{props.cloud}</div>
      <div className="col-md-2">{props.seeing}</div>
      <div className="col-md-2">{props.transparency}</div>
      <div className="col-md-2">
        {props.temp}
        <span>&#8451;</span>
      </div>
      <div className="col-md-1">{props.humidity}</div>
    </div>
  );
}

export default HourlyAstronomy;
