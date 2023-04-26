import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

function Overlay(props) {
  return (
    <div className={styles.backdrop} onClick={() => props.setShowAbout(false)}>
      <div className={styles.modal}>
        Geolocation information will solely be used for query into 7Timer's API
        in order to obtain more accurate forecasts.
        <br />
        <br />
        Umbrella recommendation as long as precipitation in any form is
        expected.
        <br />
        App was designed in Singapore's context and as such, caters primarily to
        GMT +8 timezones.
        <br />
        Should any instance of rain be predicted up to 12 hours from time of
        launching app, umbrella would be recommended.
        <br />
        <br />
        Should additional weather information be desired, please click the
        umbrella or the "Detailed Forecast" button in the bottom right.
        <br />
        Alternatively, please click the image in the top left for
        Astronomy-related information.
        <hr />
        <h4>Credits:</h4>
        Information used in this app provided via{" "}
        <a href="http://www.7timer.info/doc.php?lang=en" target="_blank">
          7Timer's
        </a>{" "}
        CIVIL and ASTRO APIs.
        <br />
        Images used drawn by Mifune Takashi,{" "}
        <a href="https://www.irasutoya.com/" target="_blank">
          みふねたかし
        </a>
        .
      </div>
    </div>
  );
}

function AboutModal(props) {
  return ReactDOM.createPortal(
    <Overlay setShowAbout={props.setShowAbout} />,
    document.querySelector("#modal-root")
  );
}

export default AboutModal;
