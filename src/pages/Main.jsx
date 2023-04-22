import React, { useState, useEffect } from "react";
import AstroCorner from "../components/AstroCorner";
import ForecastCorner from "../components/ForecastCorner";
import Umbrella from "../components/Umbrella";
import DisclaimerCorner from "../components/DisclaimerCorner";

function Main() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());

  async function getData() {
    try {
      // 7timer's init is in UTC time.
      // const res = await fetch("/weather-test-data-timer.json");
      const res = await fetch(
        "https://www.7timer.info/bin/api.pl?lon=103.8&lat=1.4&product=civil&output=json"
      );
      if (res.status === 200) {
        const weatherData = await res.json();

        // Clean data:
        const currDate = new Date(
          weatherData.init.slice(0, 4) +
            "-" +
            weatherData.init.slice(4, 6) +
            "-" +
            weatherData.init.slice(6, 8) +
            "T" +
            weatherData.init.slice(-2) +
            ":00+00:00"
        );
        console.log(currDate);
        setDate(currDate);
        setData(weatherData.dataseries.slice(0, 8));
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Error fetching data!");
    }
  }

  function checkRain() {
    return false;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AstroCorner />
      <DisclaimerCorner />
      <ForecastCorner data={data} date={date} />
      <Umbrella raining={checkRain()} />
    </>
  );
}

export default Main;
