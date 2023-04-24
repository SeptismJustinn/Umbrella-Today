import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

function Overlay(props) {
  function adjustCoords() {
    const coordArr = [0, 0];
    switch (props.currLocation) {
      case "Central":
        coordArr[0] = 103.8;
        // Technically 1.35 but API only accepts 1 d.p.
        coordArr[1] = 1.4;
        break;
      case "North":
        coordArr[0] = 103.8;
        // Lat 1.4+ but rounded down to 1.4.
        coordArr[1] = 1.4;
        break;
      case "East":
        coordArr[0] = 103.9;
        coordArr[1] = 1.4;
        break;
      case "South":
        coordArr[0] = 103.8;
        coordArr[1] = 1.3;
        break;
      case "West":
        coordArr[0] = 103.7;
        coordArr[1] = 1.4;
        break;
    }
    props.setCoords(coordArr);
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
