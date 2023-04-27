import React from "react";
import styles from "./HourlyForecast.module.css";

function HourlyAstronomy(props) {
  // Average cloud cover (1-9)
  const cloudiness = [
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
  // Seeing (1-8)
  const seeingScale = [
    '<0.5"',
    '0.5"-0.75"',
    '0.75"-1"',
    '1"-1.25"',
    '1.25"-1.5"',
    '1.5"-2"',
    '2"-2.5"',
    '>2.5"',
  ];
  // Atmospheric transparency (1-8)
  const atmTransparency = [
    "Below 0.3",
    "0.3-0.4",
    "0.4-0.5",
    "0.5-0.6",
    "0.6-0.7",
    "0.7-0.85",
    "0.85-1.0",
    "Above 1.0",
  ];
  // Humidity (-4 to 16)
  const humid = [
    "0%-5%",
    "5%-10%",
    "10%-15%",
    "15%-20%",
    "20%-25%",
    "25%-30%",
    "30%-35%",
    "35%-40%",
    "40%-45%",
    "45%-50%",
    "50%-55%",
    "55%-60%",
    "60%-65%",
    "65%-70%",
    "70%-75%",
    "75%-80%",
    "80%-85%",
    "85%-90%",
    "90%-95%",
    "95%-99%",
    "100%",
  ];
  // Wind speed (1-8)
  const wind = [
    "< 0.3m/s",
    "0.3 - 3.4m/s",
    "3.4 - 8.0m/s",
    "8.0 - 10.8m/s",
    "10.8 - 17.2m/s",
    "17.2 - 24.5m/s",
    "24.5 - 32.6m/s",
    "> 32.6m/s",
  ];

  // Function takes in prec_type string and converts it into human readable form
  function decipherPrecipitation(datasetString) {
    let output = "";
    switch (datasetString) {
      case "rain":
        output = "Rain";
        break;
      case "none":
        output = "No precipitation";
        break;
      case "snow":
        output = "Snow";
        break;
    }
    return output;
  }

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
      <div
        className={`col-md-2 ${props.prec === "none" ? "" : styles.prec_text}`}
      >
        {decipherPrecipitation(props.prec)}
      </div>
      <div className="col-md-2">{cloudiness[props.cloud - 1]}</div>
      <div className="col-md-2">{atmTransparency[props.transparency - 1]}</div>
      <div className="col-md-1">{seeingScale[props.seeing - 1]}</div>
      <div className="col-md-1">
        {props.temp}
        <span>&#8451;</span>
      </div>
      <div className="col-md-1">{humid[props.humidity + 4]}</div>
      <div
        className={`col-md-2 ${
          props.windspeed.speed > 5 ? styles.danger_text : ""
        }`}
      >
        {wind[props.windspeed.speed - 1]} ({props.windspeed.direction})
      </div>
    </div>
  );
}

export default HourlyAstronomy;
