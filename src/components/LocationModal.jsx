import React, { useState, useRef, useEffect } from "react";
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
  const [test, setTest] = useState(false);

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
      setTest(() => {
        setTimeout(() => {
          props.setShowLocation(false);
        }, 500);
        return false;
      });
      // Hide modal.
    }
  }

  useEffect(() => {
    if (!test) {
      setTest(true);
    }
  }, []);

  return (
    <div className={test ? styles.backdrop : styles.no_backdrop}>
      <div
        className={`${styles.drawer} ${test ? styles.active : styles.inactive}`}
      >
        <h4>Choose region:</h4>
        <br />
        <form className="container">
          <div className="row">
            <label>
              Central
              <input
                type="radio"
                value="Central"
                checked={props.currLocation === "Central"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              North
              <input
                type="radio"
                value="North"
                checked={props.currLocation === "North"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              East
              <input
                type="radio"
                value="East"
                checked={props.currLocation === "East"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              South
              <input
                type="radio"
                value="South"
                checked={props.currLocation === "South"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              West
              <input
                type="radio"
                value="West"
                checked={props.currLocation === "West"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Current
              <input
                type="radio"
                value="Current"
                checked={props.currLocation === "Current"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(false);
                }}
              />
            </label>
          </div>
          <div className="row">
            <label>
              Custom
              <input
                type="radio"
                value="Custom"
                checked={props.currLocation === "Custom"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                  setShowCustomField(true);
                }}
              />
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
