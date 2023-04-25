import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PageText.module.css";
import HourlyAstronomy from "../components/HourlyAstronomy";
import { Switch, Grid } from "@mui/material";

function Astronomy() {
  const [sgTime, setSgTime] = useState(true);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  // Coordinates to query API. Default to SG Central if state did not get propped properly (e.g. directly accessing /astronomy)
  const coords = location.state.coords || [103.82, 1.352];
  const hour = (sgTime ? date.getHours() : date.getUTCHours()) % 24;

  async function getAstro() {
    try {
      // const res = await fetch("/testdata/astro-test.json");
      const res = await fetch(
        `https://www.7timer.info/bin/api.pl?lon=${coords[0]}&lat=${coords[1]}&product=astro&output=json`
      );
      if (res.status === 200) {
        const dat = await res.json();
        // Clean data:
        const currDate = new Date(
          dat.init.slice(0, 4) +
            "-" +
            dat.init.slice(4, 6) +
            "-" +
            dat.init.slice(6, 8) +
            "T" +
            dat.init.slice(-2) +
            ":00+00:00"
        );
        setDate(currDate);
        // Obtain next 48 hour's data.
        setData(dat.dataseries.slice(0, 17));
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Error fetching data!");
    }
  }

  useEffect(() => {
    getAstro();
  }, []);

  return (
    <>
      <div className={styles.forecastText}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>GMT Time</Grid>
          <Grid item>
            <Switch
              defaultChecked
              onChange={(event) => {
                setSgTime(event.target.checked);
              }}
            />
          </Grid>
          <Grid item>Singapore Time (GMT+8)</Grid>
        </Grid>
        <div className="row">
          {sgTime && (
            <h2 className="col-md-8">
              Forecast as at {date.getDate()}/{date.getMonth() + 1},{" "}
              {hour < 10 ? "0" + hour : hour}00Hrs
            </h2>
          )}
          {!sgTime && (
            <h2 className="col-md-8">
              Forecast as at {date.getUTCDate()}/{date.getUTCMonth() + 1},{" "}
              {hour < 10 ? "0" + hour : hour}00Hrs
            </h2>
          )}
          <div className="col-md-4 text-end">
            Coordinates: ({`${coords[0]}, ${coords[1]}`})
          </div>
        </div>
        <div className="container">
          <h5 className="row">
            <div className="col-md-1">Time</div>
            <div className="col-md-2">Precipitation</div>
            <div className="col-md-2">Cloud Cover</div>
            <div className="col-md-2">Seeing</div>
            <div className="col-md-2">Transparency</div>
            <div className="col-md-2">Temperature</div>
            <div className="col-md-1">Humidity</div>
          </h5>
          {data.map((item, idx) => {
            return (
              <HourlyAstronomy
                key={idx}
                id={idx}
                time={(hour + item.timepoint) % 24}
                nextDay={item.timepoint >= 24 - hour ? true : false}
                thirdDay={item.timepoint >= 48 - hour ? true : false}
                prec={item.prec_type}
                cloud={item.cloudcover}
                seeing={item.seeing}
                transparency={item.transparency}
                temp={item.temp2m}
                humidity={item.rh2m}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Astronomy;
