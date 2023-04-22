import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import styles from "./Forecast.module.css";
import HourlyForecast from "../components/HourlyForecast";

function Forecast() {
  const location = useLocation();
  const linkProps = location.state;
  const hour = linkProps.date.getHours() % 24;
  return (
    <>
      {!linkProps && <Navigate replace to="/" />}
      <div className={styles.forecastText}>
        <h2>
          Forecast as at {linkProps.date.getDate()}/
          {linkProps.date.getMonth() + 1}, {hour < 10 ? "0" + hour : hour}00Hrs
        </h2>
        <div className="container">
          <div className="row">
            <div className="col-md-1">Time</div>
            <div className="col-md-3">Forecast</div>
            <div className="col-md-2">Average Rainfall</div>
            <div className="col-md-2">Temperature</div>
            <div className="col-md-2">Humidity</div>
            <div className="col-md-2">Cloudiness</div>
          </div>

          {linkProps.data.map((item, idx) => {
            return (
              <HourlyForecast
                key={idx}
                id={idx}
                time={(hour + item.timepoint) % 24}
                nextDay={item.timepoint > 24 - hour ? true : false}
                forecast={item.weather}
                prec={item.prec_amount}
                temp={item.temp2m}
                humidity={item.rh2m}
                cloudcover={item.cloudcover}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.forecastText}>
        Each forecast is made over a 3-hour time period and takes into account
        several factors to decide weather. <br />
        Negligible rainfall does not rule out possible rainfall entirely. When
        average rainfall is less than 4mm/hr, light showers may still be
        expected, especially when cloudiness is greater than 20%. <br />
      </div>
    </>
  );
}

export default Forecast;