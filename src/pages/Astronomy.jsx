import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Astronomy() {
  const location = useLocation();
  // Coordinates to query API. Default to SG Central if state did not get propped properly (e.g. directly accessing /astronomy)
  const coords = location.state.coords || [103.82, 1.352];
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());

  async function getAstro() {
    try {
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
  });

  return (
    <div>
      {date.toString()}
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default Astronomy;
