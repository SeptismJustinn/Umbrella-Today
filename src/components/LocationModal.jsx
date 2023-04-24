import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

function Overlay(props) {
  function adjustCoords() {
    const coordArr = [0, 0];
    switch (props.currLocation) {
      case "Current":
        navigator.geolocation.getCurrentPosition(
          (info) => {
            let lon = Math.round(info.coords.longitude * 1000) / 1000;
            let lat = Math.round(info.coords.latitude * 1000) / 1000;
            coordArr[0] = lon;
            coordArr[1] = lat;
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
                value="Current"
                checked={props.currLocation === "Current"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
                }}
              />
              Current
            </label>
          </div>
          <div className="col-md-4">
            <label>
              <input
                type="radio"
                value="Central"
                checked={props.currLocation === "Central"}
                onChange={(event) => {
                  props.setCurrLocation(event.target.value);
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
                }}
              />
              West
            </label>
          </div>
        </form>
        <br />
        <div className="row">
          <button
            className="col-md-6"
            onClick={(event) => {
              event.preventDefault();
              adjustCoords();
              props.setShowLocation(false);
            }}
          >
            Confirm
          </button>
          <button
            className="col-md-6"
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
      currLocation={props.currLocation}
      setCurrLocation={props.setCurrLocation}
      setShowLocation={props.setShowLocation}
    />,
    document.querySelector("#modal-root")
  );
}

export default LocationModal;
