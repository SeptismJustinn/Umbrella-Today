import React from "react";
import { TextField } from "@mui/material";
import styles from "./LocationCustomField.module.css";

function LocationCustomField(props) {
  function handleLongChange(val) {
    if (!Number.isNaN(Number(val)) && val >= -180 && val <= 180) {
      props.setCustomLong(val);
      props.setLongErr(false);
    } else {
      props.setLongErr(true);
    }
  }

  function handleLatChange(val) {
    if (!Number.isNaN(Number(val)) && val >= -90 && val <= 90) {
      props.setCustomLat(val);
      props.setLatErr(false);
    } else {
      props.setLatErr(true);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <TextField
          error={props.longErr}
          variant="standard"
          label="Longitude"
          sx={{ width: "100%" }}
          defaultValue={props.coords[0]}
          onChange={(event) => handleLongChange(event.target.value)}
          helperText={props.longErr ? "Enter number between -180 and 180" : ""}
          inputRef={props.longRef}
        />
      </div>
      <div>
        <TextField
          error={props.latErr}
          variant="standard"
          label="Latitude"
          sx={{ width: "100%" }}
          defaultValue={props.coords[1]}
          onChange={(event) => handleLatChange(event.target.value)}
          helperText={props.latErr ? "Enter number between -90 and 90" : ""}
          inputRef={props.latRef}
        />
      </div>
    </div>
  );
}

export default LocationCustomField;
