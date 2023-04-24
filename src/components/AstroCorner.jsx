import React from "react";
import cornerStyle from "./Corner.module.css";
import styles from "./AstroCorner.module.css";

function AstroCorner(props) {
  function checkDaytime() {
    const time = new Date().getHours();
    return time > 6 && time < 18;
  }
  return (
    <div className={`${styles.container} ${cornerStyle.topLeft}`}>
      <div
        className={`${styles.astral} ${
          checkDaytime() ? styles.sun : styles.moon
        }`}
      />
      {props.raining && (
        <>
          <img className={styles.cloud_bottom} src="/cloud.png" />
          <img className={styles.cloud_bottomright} src="/cloud.png" />
          <img className={styles.cloud_right} src="/cloud.png" />
        </>
      )}
    </div>
  );
}

export default AstroCorner;
