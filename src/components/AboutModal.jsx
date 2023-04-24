import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

function Overlay(props) {
  return (
    <div className={styles.backdrop} onClick={() => props.setShowAbout(false)}>
      <div className={styles.modal}>
        Information used in this app provided via{" "}
        <a href="http://www.7timer.info/doc.php?lang=en" target="_blank">
          7Timer's
        </a>{" "}
        CIVIL and ASTRO APIs.
        <br />
        <br />
        Umbrella recommendation is made regardless of volume of rainfall. Should
        any instance of rain be predicted up to 12 hours from time of launching
        app, umbrella would be recommended.
        <br />
        <br />
        Should additional weather information be desired, please click the
        umbrella or the "Detailed Forecast" button in the bottom right.
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