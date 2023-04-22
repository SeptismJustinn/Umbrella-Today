import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Main() {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const res = await fetch("/weather-test-data-timer.json");

      if (res.status === 200) {
        const weatherData = await res.json();
        setData(weatherData.dataseries);
      } else {
        throw new Error();
      }
    } catch (err) {
      alert("Error fetching data!");
    }
  }

  useEffect(() => {
    getData();
  });

  return (
    <div>
      Main
      <NavLink to="/forecast" state={{ data }}>
        Forecast
      </NavLink>
    </div>
  );
}

export default Main;
