import React, { useState } from "react";
import cornerStyle from "./Corner.module.css";
import LocationModal from "./LocationModal";

function LocationCorner(props) {
  const [showLocation, setShowLocation] = useState(false);
  const [currLocation, setCurrLocation] = useState("Central");

  return (
    <>
      <div
        className={`${cornerStyle.topRight} ${cornerStyle.click}`}
        onClick={() => setShowLocation(true)}
      >
        Location:
        <br />
        Singapore {currLocation}
        <br />({props.coords[0]} , {props.coords[1]})
      </div>
      {showLocation && (
        <LocationModal
          setCoords={props.setCoords}
          currLocation={currLocation}
          setCurrLocation={setCurrLocation}
          setShowLocation={setShowLocation}
          getData={props.getData}
        />
      )}
    </>
  );
}

export default LocationCorner;
