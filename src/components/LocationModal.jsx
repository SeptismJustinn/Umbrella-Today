import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import LocationCustomField from "./LocationCustomField";

function Overlay(props) {
  // State to toggle custom coordinate input fields
  const [showCustomField, setShowCustomField] = useState(
    props.currLocation === "Custom"
  );
  // States to store coordinates entered into input fields
  const [customLong, setCustomLong] = useState(props.coords[0]);
  const [customLat, setCustomLat] = useState(props.coords[1]);
  // States to track if invalid values are entered into input fields.
  const [longErr, setLongErr] = useState(false);
  const [latErr, setLatErr] = useState(false);
  // Refs to allow for focusing onto input fields.
  const longRef = useRef();
  const latRef = useRef();

  // Function to lift coordinates to Main
  function adjustCoords() {
    const coordArr = [0, 0];
    switch (props.currLocation) {
      case "Custom":
        // Extract custom coordinates from input fields.
        coordArr[0] = Math.round(customLong * 1000) / 1000;
        coordArr[1] = Math.round(customLat * 1000) / 1000;
        props.setCoords(coordArr);
        break;
      case "Current":
        // Utilize system location's coordinates.
        navigator.geolocation.getCurrentPosition(
          (info) => {
            let lon = Math.round(info.coords.longitude * 1000) / 1000;
            let lat = Math.round(info.coords.latitude * 1000) / 1000;
            coordArr[0] = lon;
            coordArr[1] = lat;
            // setCoords MUST be called within callback function here.
            props.setCoords(coordArr);
          },
          () => {
            alert("Error getting current coordinates...");
          }
        );
        break;
      case "Central":
        // Upper Peirce reservoir.
        coordArr[0] = 103.82;
        coordArr[1] = 1.352;
        props.setCoords(coordArr);
        break;
      case "North":
        // Sembawang MRT.
        coordArr[0] = 103.82;
        coordArr[1] = 1.449;
        props.setCoords(coordArr);
        break;
      case "East":
        // Tampines East MRT.
        coordArr[0] = 103.955;
        coordArr[1] = 1.356;
        props.setCoords(coordArr);
        break;
      case "South":
        // SGH.
        coordArr[0] = 103.836;
        coordArr[1] = 1.28;
        props.setCoords(coordArr);
        break;
      case "West":
        // NTU.
        coordArr[0] = 103.683;
        coordArr[1] = 1.351;
        props.setCoords(coordArr);
        break;
    }
  }

  // Function to handle confirm button click.
  function handleConfirm() {
    // Focus on erroneous fields.
    if (longErr) {
      return longRef.current.focus();
    } else if (latErr) {
      return latRef.current.focus();
    } else {
      // Lift coords
      adjustCoords();
      // Set umbrella image to load
      props.setLoading(true);
      // Hide modal.
      props.setShowLocation(false);
    }
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal_small}>
        <h2>Choose Singapore region:</h2>
        <br />
        <form className="row">
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="Central"
                checked={props.currLocation === "Central"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
              Central
            </label>
          </div>
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="North"
                checked={props.currLocation === "North"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
              North
            </label>
          </div>
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="East"
                checked={props.currLocation === "East"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
              East
            </label>
          </div>
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="South"
                checked={props.currLocation === "South"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
              South
            </label>
          </div>
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="West"
                checked={props.currLocation === "West"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
              West
            </label>
          </div>
          <div className="col-md-4" />
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="Current"
                checked={props.currLocation === "Current"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
              Current
            </label>
          </div>
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="Custom"
                checked={props.currLocation === "Custom"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(true);
                }}
              />
              Custom
            </label>
          </div>
        </form>
        {showCustomField && (
          <LocationCustomField
            coords={[customLong, customLat]}
            setCustomLong={setCustomLong}
            setCustomLat={setCustomLat}
            longErr={longErr}
            latErr={latErr}
            setLongErr={setLongErr}
            setLatErr={setLatErr}
            longRef={longRef}
            latRef={latRef}
          />
        )}
        <hr />
        <div className="row">
          <button
            className="btn btn-primary col-md-6"
            onClick={(event) => {
              event.preventDefault();
              handleConfirm();
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-danger col-md-6"
            onClick={(event) => {
              event.preventDefault();
              props.setShowLocation(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationModal(props) {
  return ReactDOM.createPortal(
    <Overlay
      setCoords={props.setCoords}
      coords={props.coords}
      currLocation={props.currLocation}
      setCurrLocation={props.setCurrLocation}
      setShowLocation={props.setShowLocation}
      setLoading={props.setLoading}
    />,
    document.querySelector("#modal-root")
  );
}

export default LocationModal;
