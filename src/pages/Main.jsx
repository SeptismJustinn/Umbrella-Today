import React, { useState, useEffect } from "react";
import AstroCorner from "../components/AstroCorner";
import ForecastCorner from "../components/ForecastCorner";
import Umbrella from "../components/Umbrella";
import DisclaimerCorner from "../components/DisclaimerCorner";

// API used: 7timer
function Main() {
  // State to contain fetched data.
  const [data, setData] = useState([]);
  // State to contain the date at which data was initialized.
  const [date, setDate] = useState(new Date());

  // GET method specific to 7timer API.
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
        setDate(currDate);
        setData(weatherData.dataseries.slice(0, 8));
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Error fetching data!");
    }
  }

  // Function to check if there will be rain in the next ~12hrs from rounded up hour at which component rendered.
  function checkRain() {
    const currTime = new Date();
    const currHour = currTime.getHours() + (currTime.getMinutes() > 30 ? 1 : 0);
    const timePoint = Math.floor((currHour - date.getHours()) / 3);
    const weather12Hr = [...data.slice(timePoint, timePoint + 4)].map(
      (item) => {
        return item.prec_type;
      }
    );
    return weather12Hr.includes("rain");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AstroCorner />
      <DisclaimerCorner />
      <ForecastCorner data={data} date={date} />
      <Umbrella raining={checkRain()} data={data} date={date} />
    </>
  );
}

export default Main;
