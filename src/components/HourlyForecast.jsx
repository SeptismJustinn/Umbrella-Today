import React from "react";
import styles from "./HourlyForecast.module.css";

function HourlyForecast(props) {
  const precipitationRates = [
    "Negligible",
    "0-0.25",
    "1-4",
    "4-10",
    "10-16",
    "16-30",
    "30-50",
    "50-75",
    ">75",
  ];
  const cloudiness = [
    ,
    "0%-6%",
    "6%-19%",
    "19%-31%",
    "31%-44%",
    "44%-56%",
    "56%-69%",
    "69%-81%",
    "81%-94%",
    "94%-100%",
  ];
  function decipherWeather(datasetString) {
    console.log(datasetString);
    let string = datasetString;
    let output;
    let switchFlag = true;
    let thunderFlag = false;
    switch (string.charAt(0)) {
      case "p":
        output = "Partially cloudy skies";
        break;
      case "m":
        output = "Very cloudy skies";
        break;
      case "o":
        output = "Occasional showers";
        break;
      case "i":
        output = "Isolated showers";
        break;
      case "t":
        thunderFlag = true;
        break;
      default:
        switchFlag = false;
    }
    if (thunderFlag) {
      if (string.substring(2, 6) === "rain") {
        return "Thunderstorm";
      } else {
        return "Possible thunderstorm";
      }
    } else if (switchFlag) {
      return output;
    } else {
      string = string.substring(0, 4);
    }
    switch (string) {
      case "clea":
        output = "Clear skies";
        break;
      case "clou":
        output = "Extremely cloudy";
        break;
      case "humi":
        output = "Foggy";
        break;
      case "ligh":
        output = "Light rain/showers";
        break;
      case "rain":
        output = "Rain expected";
        break;
    }
    return output;
  }

  return (
    <div className={`row ${props.nextDay ? styles.next_day : ""}`}>
      <div className="col-md-1">
        {props.time < 12 ? props.time + "AM" : (props.time % 12) + "PM"}
      </div>
      <div className="col-md-3">{decipherWeather(props.forecast)}</div>
      <div className="col-md-2">
        {precipitationRates[props.prec] + (props.prec === 0 ? "" : "mm/hr")}
      </div>
      <div className="col-md-2">
        {props.temp}
        <span>&#8451;</span>
      </div>
      <div className="col-md-2">{props.humidity}</div>
      <div className="col-md-2">{cloudiness[props.cloudcover]}</div>
    </div>
  );
}

export default HourlyForecast;
